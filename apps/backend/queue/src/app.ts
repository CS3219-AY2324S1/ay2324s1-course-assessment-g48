import { Server } from "socket.io";
import { DifficultyQueue } from "./queue/difficultyQueue";
import { PORT } from "./utils/config";
import express from "express";
import http from "http";
import PingRouter from "./routes/pingRouter";
import SocketController from "./controllers/socketController";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {});

server.listen(PORT, () => {
  console.log("Queue Server is listening on port 8002");
});

app.use("/ping", new PingRouter().routes());

const socketController = new SocketController();

io.on("connect", (socket) => socketController.handleConnection(socket));

process.on("SIGINT", () => {
  console.log("Process is terminating. Closing all WebSockets.");

  io.fetchSockets().then((sockets) => {
    sockets.forEach((socket) => {
      socket.disconnect(true);
    });
    process.exit(0);
  });
});
