import { Socket } from "socket.io";
import { Difficulty } from "../enum/Difficulty";
import { Queue } from "../queue/queue";
import { ProgrammingLanguages } from "../enum/ProgrammingLanguages";

class QueueService {
  queues: Map<string, Queue>;

  constructor() {
    this.queues = new Map();
    // this.queues.set(Difficulty.EASY, new Queue(Difficulty.EASY));
    // this.queues.set(Difficulty.MEDIUM, new Queue(Difficulty.MEDIUM));
    // this.queues.set(Difficulty.HARD, new Queue(Difficulty.HARD));

    for (const diff of Object.values(Difficulty)) {
      for (const language of Object.values(ProgrammingLanguages)) {
        const nameSpace = diff + "/" + language;
        this.queues.set(nameSpace, new Queue(nameSpace, diff, language));
      }
    }
  }

  public attemptToMatchUsers(nameSpace: string, uid: number, socket: Socket) {
    console.log(`Namespace: ${nameSpace}`);
    const queue = this.getQueue(nameSpace);
    queue?.attemptToMatchUsers(uid, socket);
  }

  private getQueue(nameSpace: string) {
    return this.queues.get(nameSpace);
  }

  public checkAndReleaseOtherConnections(uid: number) {
    for (const queue of this.queues.values()) {
      queue.checkAndReleaseOtherConnection(uid);
    }
  }

  public cleanUp(uid: number) {
    console.log(`\n`);
    console.log(`Disconnected from uid: ${uid}`);
    console.log(`Initiating cleanup for uid: ${uid}`);
    this.queues.forEach((queue: Queue) => {
      queue.cleanup(uid);
    });

    console.log(`Cleanup for uid: ${uid} complete`);
  }

  public onExit() {
    this.queues.forEach((queue: Queue) => queue.onExit());
  }
}

export default QueueService;
