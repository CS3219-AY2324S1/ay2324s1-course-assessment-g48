import { Server } from "socket.io";
import { DifficultyQueue } from "./queue/difficultyQueue";

const io = new Server(8001, {});

io.on("connect", (socket) => {
  socket.on("matching", (socket) => {

    console.log(`Matching`);
    console.log(`Socket: ${socket.data}`);
  //   return;
    const difficulty = socket.data.difficulty;
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
    if (queue.isThereWaitingUser()) {
      queue.matchUsers(socket.data.uid, socket)
    } else {
      queue.pushToWaitingList(socket.data.uid, socket)
    }

  });
  console.log(socket.data);
  console.log("Received connection from frontend");
});

const easyQueue = new DifficultyQueue("easy");
const mediumQueue = new DifficultyQueue("medium");
const hardQueue = new DifficultyQueue("hard");

enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
};

