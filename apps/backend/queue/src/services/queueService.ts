import { Socket } from "socket.io";
import { Difficulty } from "../enum/Difficulty";
import { DifficultyQueue } from "../queue/difficultyQueue";
import axios from "axios";
import { SESSION_URL } from "../utils/config";

class QueueService {
  queues: Map<Difficulty, DifficultyQueue>;

  constructor() {
    this.queues = new Map();
    this.queues.set(Difficulty.EASY, new DifficultyQueue(Difficulty.EASY));
    this.queues.set(Difficulty.MEDIUM, new DifficultyQueue(Difficulty.MEDIUM));
    this.queues.set(Difficulty.HARD, new DifficultyQueue(Difficulty.HARD));
  }

  public attemptToMatchUsers(
    difficulty: Difficulty,
    uid: number,
    socket: Socket
  ) {
    const queue = this.getQueue(difficulty);
    queue?.attemptToMatchUsers(uid, socket);
  }

  private getQueue(difficulty: Difficulty) {
    return this.queues.get(difficulty);
  }

  public checkAndReleaseOtherConnections(uid: number) {
    for (const queue of Object.values(this.queues)) {
      queue.checkAndReleaseOtherConnection(uid);
    }
  }

  public cleanUp(uid: number) {
    console.log(`\n`);
    console.log(`Disconnected from uid: ${uid}`);
    console.log(`Initiating cleanup for uid: ${uid}`);
    this.queues.forEach((queue: DifficultyQueue) => {
      queue.cleanup(uid);
    });

    console.log(`Cleanup for uid: ${uid} complete`);
  }

  public onExit() {
    this.queues.forEach((queue: DifficultyQueue) => queue.onExit());
  }
}

export default QueueService;
