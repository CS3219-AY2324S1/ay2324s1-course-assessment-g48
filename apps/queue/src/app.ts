import { Server } from "socket.io";
import { DifficultyQueue } from "./queue/difficultyQueue";

const io = new Server(8001, {});

enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

io.on("connect", (socket) => {
  //   socket.disconnect();
  socket.on("matching", (data, callback) => {
    console.log(`______________________________`);
    // console.log(`Socket data: ${JSON.stringify(data)}`);
    const difficulty = data.difficulty;
    let queue: DifficultyQueue;
    switch (difficulty) {
      case Difficulty.EASY:
        queue = easyQueue;
        break;
      case Difficulty.MEDIUM:
        queue = mediumQueue;
        break;
      case Difficulty.HARD:
        queue = hardQueue;
        break;
      default:
        throw new Error();
    }

    for (const queue of queues) {
      queue.checkAndReleaseOtherConnection(data.uid);
    }

    queue.attemptToMatchUsers(data.uid, socket);
    // console.log(`SocketMap: [${JSON.stringify(queue.socketMap)}]`)
    socket.on("disconnect", () => {
      console.log(`\n`);
      console.log(`Disconnected from ${data.uid}`);
      console.log(`Initiating cleanup for ${data.uid}`);
      easyQueue.cleanup(data.uid);
      mediumQueue.cleanup(data.uid);
      hardQueue.cleanup(data.uid);
      socket.removeAllListeners();
      console.log(`Cleanup for ${data.uid} complete`);
    });
    setTimeout(() => {
      if (!socket.disconnected) {
        console.log(`\n`);
        socket.emit("timeout");
        console.log(
          `Disconnecting from ${data.uid} due to 30s passing and no match was found.`
        );
        socket.disconnect();
      }
    }, 30000);
  });

  socket.emit("connected");
  //   console.log("Received connection from frontend");
});

const easyQueue = new DifficultyQueue(Difficulty.EASY);
const mediumQueue = new DifficultyQueue(Difficulty.MEDIUM);
const hardQueue = new DifficultyQueue(Difficulty.HARD);
const queues: DifficultyQueue[] = [easyQueue, mediumQueue, hardQueue];
