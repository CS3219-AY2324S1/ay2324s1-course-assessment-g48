import { Socket } from "socket.io";
import amqp from "amqplib";
import axios from "axios";
import { SESSION_URL } from "../utils/config";
import Producer from "../message-queue/Producer";
import Consumer from "../message-queue/Consumer";

export class DifficultyQueue {
  waitList: number[];
  socketMap: Map<number, Socket>;
  nameSpace: string;
  producer: Producer;
  consumer: Consumer;

  constructor(nameSpace: string) {
    this.nameSpace = nameSpace;
    this.waitList = [];
    this.socketMap = new Map();
    this.producer = new Producer(nameSpace);
    this.consumer = new Consumer(nameSpace, (uid) => this.matchUsers(uid));
  }

  public async generateSession(user1: number, user2: number) {
    const sessionID = await axios
      .post(SESSION_URL, { users: [user1, user2] })
      .then((response) => {
        return response.data.sessionId;
      })
      .catch((error) => {
        console.error(error);
      });
    return sessionID;
  }

  public isThereWaitingUser() {
    console.log("Checking if there is a waiting user");
    return this.waitList.length > 0;
  }

  public attemptToMatchUsers(uid: number, socket: Socket) {
    this.socketMap.set(uid, socket);
    this.producer.produceMessage(String(uid));
  }

  public checkAndReleaseOtherConnection(uid: number) {
    if (this.socketMap.get(uid)) {
      this.socketMap.get(uid)?.emit("other-connection");
      this.cleanup(uid);
    }
  }

  public async matchUsers(uid: number) {
    console.log(this.waitList);
    if (this.isThereWaitingUser()) {
      const firstUserUid = this.waitList.shift();
      if (firstUserUid === undefined) {
        throw new Error("For some reason there is no UID in the waiting list");
      }
      //   console.log(`First user uid: ${firstUserUid}, second user uid: ${uid}`)
      const firstUserSocket = this.socketMap.get(firstUserUid);
      const secondUserSocket = this.socketMap.get(uid);
      const randomSessionId = await this.generateSession(firstUserUid, uid);
      if (!firstUserSocket || !secondUserSocket) {
        throw new Error(
          "There was no socket associated with the firstUserSocket"
        );
      }
      firstUserSocket.emit("matched", {
        peerId: uid,
        err: "",
        sessionId: randomSessionId,
      });
      secondUserSocket.emit("matched", {
        peerId: firstUserUid,
        err: "",
        sessionId: randomSessionId,
      });
      console.log(
        `There was a waiting user ${firstUserUid} for the ${this.nameSpace} queue. Pairing ${firstUserUid} with ${uid}, with sessionId ${randomSessionId}`
      );
      console.log(`Waitlist: [${JSON.stringify(this.waitList.join(", "))}]`);
      this.removeFromSocketMap(firstUserUid, uid);
    } else {
      this.waitList.push(uid);
      console.log(
        `There is no waiting user for the ${this.nameSpace} queue, so pushing user to waiting queue.`
      );
      console.log(`Waitlist: [${JSON.stringify(this.waitList.join(", "))}]`);
    }
  }

  public removeFromSocketMap(...uids: number[]) {
    for (const uid of uids) {
      this.socketMap.get(uid)?.removeAllListeners();
      this.socketMap.delete(uid);
    }
  }

  public cleanup(uid: number) {
    this.removeFromSocketMap(uid);
    this.waitList = this.waitList.filter((num) => num != uid);
  }
}
