import { Socket } from "socket.io";
import { produceMessage } from "../producer";
import { consumeMessage } from "../consumer";
import e from "cors";

export class DifficultyQueue {
  waitList: number[];
  socketMap: Map<number, Socket>;
  nameSpace: string;
  constructor(nameSpace: string) {
    this.nameSpace = nameSpace;
    this.waitList = [];
    this.socketMap = new Map();
    consumeMessage(this);
  }

  public isThereWaitingUser() {
    console.log("Checking if there is a waiting user");
    return this.waitList.length > 0;
  }

  public attemptToMatchUsers(uid: number, socket: Socket) {
    // console.log("Matching users");
    // console.log(`UID: ${uid}`);
    
    this.socketMap.set(uid, socket);
    console.log("RIGHT AFTER")
    console.log(this.socketMap);
    produceMessage(this.nameSpace, String(uid));
  }

  public checkAndReleaseOtherConnection(uid:number) {
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
      const firstUserUid = this.waitList.shift() 
      if (firstUserUid === undefined) {
        throw new Error("For some reason there is no UID in the waiting list");
      }
    //   console.log(`First user uid: ${firstUserUid}, second user uid: ${uid}`)
      const firstUserSocket = this.socketMap.get(firstUserUid);
      const secondUserSocket = this.socketMap.get(uid);
      if (!firstUserSocket || !secondUserSocket) {
        throw new Error("There was no socket associated with the firstUserSocket");
      }
      firstUserSocket.emit("matched", {err: "", session: String(uid) + String(firstUserUid) });
      secondUserSocket.emit("matched", {err: "", session: String(uid) + String(firstUserUid)});
      this.removeFromSocketMap(firstUserUid, uid);
    } else {
      this.waitList.push(uid);
    //   console.log(`These people are in the waitlist ${JSON.stringify(this.waitList.join(", "))}`);
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
    this.waitList = this.waitList.filter(num => num != uid);
  }
  
}


// class WaitingUser {
//   uid: number
//   callback: () => void
//   constructor(uid: number, callback: () => void) {
//     this.uid = 
//   }
// }
