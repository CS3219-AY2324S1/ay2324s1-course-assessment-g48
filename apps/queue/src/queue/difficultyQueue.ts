import { Socket } from "socket.io";

export class DifficultyQueue {
  waitList: WaitingUser[];
  nameSpace: string;
  constructor(nameSpace: string) {
    this.nameSpace = nameSpace;
    this.waitList = [];
  }

  public pushToWaitingList(uid: number, socket: Socket) {
    console.log("Adding user to waiting list");
    this.waitList.push(new WaitingUser(uid, socket));
  }

  public isThereWaitingUser() {
    console.log("Checking if there is a waiting user");
    console.log(`These people are in the waitlist ${this.waitList.join(", ")}`);
    return this.waitList.length > 0;
  }

  public matchUsers(uid: number, socket: Socket) {
    console.log("Matching users");
    const firstUser = this.waitList.shift();
    firstUser?.socket.emit("matched", {err: "", session: String(uid) + String(firstUser.uid) });
    socket.emit("matched", {err: "", session: String(uid) + String(firstUser?.uid)})
  }
}


class WaitingUser {
  socket: Socket;
  uid: number;

  constructor(uid: number, socket: Socket) {
    this.socket = socket;
    this.uid = uid;
  }
}
