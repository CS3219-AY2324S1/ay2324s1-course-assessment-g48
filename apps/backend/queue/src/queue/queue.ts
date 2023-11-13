import { Socket } from "socket.io";
import axios from "axios";
import { SESSION_URL } from "../utils/config";
import Producer from "../message-queue/Producer";
import Consumer from "../message-queue/Consumer";

export class Queue {
  waitList: number[];
  socketMap: Map<number, Socket>;
  nameSpace: string;
  producer: Producer;
  consumer: Consumer;
  next?: Queue;

  constructor(nameSpace: string, nextQueue?: Queue) {
    this.nameSpace = nameSpace;
    this.waitList = [];
    this.socketMap = new Map();
    this.producer = new Producer(nameSpace);
    this.consumer = new Consumer(nameSpace, (uid) => this.matchUsers(uid));
    this.next = nextQueue;
  }

  public attemptToMatchUsers(uid: number, socket: Socket) {
    this.socketMap.set(uid, socket);
    this.producer.produceMessage(String(uid));
  }

  public checkAndReleaseOtherConnection(uid: number) {
    console.log(`Attempting to release ${uid} from ${this.nameSpace}`);
    if (this.socketMap.get(uid)) {
      this.socketMap.get(uid)?.emit("other-connection");
      this.cleanup(uid);
    }
  }

  public async matchUsers(uid: number) {
    console.log(this.waitList);
    if (this.isThereWaitingUser()) {
      const firstUserUid = this.waitList.shift();
      const secondUserSocket = this.socketMap.get(uid);
      console.log(`First user: ${firstUserUid}`);
      console.log(`Second user: ${uid}`);
      if (firstUserUid === undefined) {
        secondUserSocket?.emit(
          "error",
          "For some reason there is no UID in the waiting list"
        );
        this.cleanup(uid);
        return;
      }

      const firstUserSocket = this.socketMap.get(firstUserUid);

      const randomSessionId = await this.generateSession(firstUserUid, uid);
      console.log(`This is the random sessionId: ${randomSessionId}`);

      if (!randomSessionId) {
        console.log("Something went wrong when creating your session.");
        secondUserSocket?.emit(
          "error",
          "Something went wrong when creating your session."
        );
        firstUserSocket?.emit(
          "error",
          "Something went wrong when creating your session."
        );
        this.cleanup(uid);
        this.cleanup(firstUserUid);
        return;
      }

      if (!firstUserSocket || !secondUserSocket) {
        secondUserSocket &&
          secondUserSocket?.emit(
            "error",
            "There was no socket associated with the first user"
          );
        firstUserSocket &&
          firstUserSocket?.emit(
            "error",
            "There was no socket associated with the second user"
          );
        this.cleanup(uid);
        this.cleanup(firstUserUid);
        return;
      }
      firstUserSocket.emit("matched", {
        peerId: uid,
        sessionId: randomSessionId,
      });
      secondUserSocket.emit("matched", {
        peerId: firstUserUid,
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

  public cleanup(uid: number) {
    this.removeFromSocketMap(uid);
    this.waitList = this.waitList.filter((num) => num != uid);
  }

  public onExit() {
    this.producer.close();
  }

  private async generateSession(user1: number, user2: number) {
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

  private removeFromSocketMap(...uids: number[]) {
    for (const uid of uids) {
      this.socketMap.get(uid)?.removeAllListeners();
      this.socketMap.delete(uid);
    }
  }

  private isThereWaitingUser() {
    console.log("Checking if there is a waiting user");
    return this.waitList.length > 0;
  }
}
