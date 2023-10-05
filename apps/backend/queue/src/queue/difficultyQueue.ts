import { Socket } from "socket.io";
import { produceMessage } from "../producer";
import amqp from "amqplib";
import e from "cors";
import crypto from 'crypto';

export class DifficultyQueue {
  waitList: number[];
  socketMap: Map<number, Socket>;
  nameSpace: string;
  constructor(nameSpace: string) {
    this.nameSpace = nameSpace;
    this.waitList = [];
    this.socketMap = new Map();
    this.connectToAmqp();
  }

  public generateSessionId() {
    return crypto.randomBytes(16).toString('base64');
  }

  public isThereWaitingUser() {
    console.log("Checking if there is a waiting user");
    return this.waitList.length > 0;
  }

  public attemptToMatchUsers(uid: number, socket: Socket) {
    // console.log("Matching users");
    // console.log(`UID: ${uid}`);

    this.socketMap.set(uid, socket);
    produceMessage(this.nameSpace, String(uid));
  }

  public checkAndReleaseOtherConnection(uid: number) {
    if (this.socketMap.get(uid)) {
      //   console.log("This user already exists");
      this.socketMap.get(uid)?.emit("other-connection");
      this.cleanup(uid);
    } else {
      //   console.log(this.waitList)
      //   console.log(`${this.nameSpace} queue does not have ${uid}`)
    }
  }

  public matchUsers(uid: number) {
    if (this.isThereWaitingUser()) {
      const firstUserUid = this.waitList.shift();
      if (firstUserUid === undefined) {
        throw new Error("For some reason there is no UID in the waiting list");
      }
      //   console.log(`First user uid: ${firstUserUid}, second user uid: ${uid}`)
      const firstUserSocket = this.socketMap.get(firstUserUid);
      const secondUserSocket = this.socketMap.get(uid);
      const randomSessionId = this.generateSessionId()
      if (!firstUserSocket || !secondUserSocket) {
        throw new Error(
          "There was no socket associated with the firstUserSocket"
        );
      }
      firstUserSocket.emit("matched", {
        peerId: uid,
        err: "",
        sessionId: randomSessionId
      });
      secondUserSocket.emit("matched", {
        peerId: firstUserUid,
        err: "",
        sessionId: randomSessionId
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

  private async connectToAmqp() {
    console.log("Connecting to RabbitMQ", process.env.RABBITMQ_URL);
    const connection = await amqp.connect(process.env.RABBITMQ_URL || "amqp://172.20.10.4:5672");
    const channel = await connection.createChannel();

    await channel.assertQueue(this.nameSpace, { durable: true });

    channel.consume(this.nameSpace, (message) => {
      if (message != null) {
        // console.log(
        //   `Consumer: Received message from ${
        //     this.nameSpace
        //   }: ${message.content.toString()}`
        // );
        //   console.log(difficultyQueue);
        this.matchUsers(Number(message.content.toString()));
        channel.ack(message);
        //   console.log(JSON.stringify(difficultyQueue));
        //   console.log(difficultyQueue.socketMap);
      }
    });
  }
}
