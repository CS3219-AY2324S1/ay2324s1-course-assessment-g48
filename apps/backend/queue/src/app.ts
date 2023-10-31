import { Server } from "socket.io";
import { DifficultyQueue } from "./queue/difficultyQueue";
import { PORT } from "./utils/config";
import express from "express";
import http from "http";

class App {
  io: Server;

  constructor() {
    const app = express();
    const server = http.createServer(app);
    this.io = new Server(server, {
      path: "/queue",
    });

    server.listen(PORT, () => {
      console.log("Queue Server is listening on port 8002");
    });

    app.get("/ping", (req, res) => {
      res.status(200).json({ message: "pong" });
    });
  }
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: "/queue",
});

server.listen(PORT, () => {
  console.log("Queue Server is listening on port 8002");
});

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

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
