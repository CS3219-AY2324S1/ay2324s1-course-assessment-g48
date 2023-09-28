import { Server } from "socket.io";
import { DifficultyQueue } from "./queue/difficultyQueue";
import { PORT } from "./utils/config";

const io = new Server(PORT, {});

enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard",
}

io.on("connect", (socket) => {

  //   socket.disconnect();
  socket.on("matching", (data, callback) => {
    console.log(`\n`);
    console.log(`Socket data: ${JSON.stringify(data)}`);
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
      queue.checkAndReleaseOtherConnection(data.user.id);
    }

    // console.log(`SocketMap: [${JSON.stringify(queue.socketMap)}]`)
    socket.on("disconnect", () => {
      console.log(`\n`);
      console.log(`Disconnected from ${data.user}`);
      console.log(`Initiating cleanup for ${data.user}`);
      easyQueue.cleanup(data.user);
      mediumQueue.cleanup(data.user);
      hardQueue.cleanup(data.user);
      socket.removeAllListeners();
      console.log(`Cleanup for ${data.user} complete`);
    });
    queue.attemptToMatchUsers(data.user.id, socket);
    setTimeout(() => {
      if (!socket.disconnected) {
        console.log(`\n`);
        socket.emit("timeout");
        console.log(
          `Disconnecting from ${data.user} due to 30s passing and no match was found.`
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
