import { Server } from "socket.io";
import { DifficultyQueue } from "./queue/difficultyQueue";
import { PORT } from "./utils/config";
import express from "express";
import http from "http";

// const io = new Server(PORT, {});

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: "/queue",
  cors: {
    origin: [
      "http://localhost",
      "http://localhost:80",
      "http://localhost:3000",
      "http://localhost:8000",
      "http://localhost:8080",
      "http://localhost:8001",
      "http://localhost:8022",
      "http://localhost:8500",
      "http://localhost:9000",
      "http://34.120.70.36",
      "http://leetpal.com",
      "http://www.leetpal.com",
      "https://www.leetpal.com",
    ],
  },
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

const easyQueue = new DifficultyQueue(Difficulty.EASY);
const mediumQueue = new DifficultyQueue(Difficulty.MEDIUM);
const hardQueue = new DifficultyQueue(Difficulty.HARD);
const queues: DifficultyQueue[] = [easyQueue, mediumQueue, hardQueue];

io.on("connect", (socket) => {
  console.log("Received connection from frontend");
  socket.emit("connected", () => console.log("Connected to frontend"));
  //   socket.disconnect();
  console.log(`Connecting to ${socket.id}`);
  // socket.disconnect();
  socket.on("matching", (data, callback) => {
    console.log(`\n`);
    console.log(callback)
    console.log(`Socket data: ${JSON.stringify(data)}`);
    console.log(`Received matching request from ${data.user}`);
    socket.emit("matching");
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
      console.log("in loop");
      queue.checkAndReleaseOtherConnection(data.user.id);
    }

    // console.log(`SocketMap: [${JSON.stringify(queue.socketMap)}]`)
    socket.on("disconnect", () => {
      console.log(`\n`);
      console.log(`Disconnected from ${data.user}`);
      console.log(`Initiating cleanup for ${data.user}`);
      easyQueue.cleanup(data.user.id);
      mediumQueue.cleanup(data.user.id);
      hardQueue.cleanup(data.user.id);
      socket.removeAllListeners();
      console.log(`Cleanup for ${data.user} complete`);
    });

    console.log("Attempting to match users");
    queue.attemptToMatchUsers(data.user.id, socket);
    console.log("queue ended");
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
});
