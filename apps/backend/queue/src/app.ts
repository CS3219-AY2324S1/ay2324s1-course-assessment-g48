import { Server } from "socket.io";
import { PORT } from "./utils/config";
import express from "express";
import http from "http";
import PingRouter from "./routes/pingRouter";
import SocketController from "./controllers/socketController";
import cors from "cors";

const allowedOrigins = [
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
];

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  path: "/queue",
  cors: {
    origin: allowedOrigins
  },
});


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

server.listen(PORT, () => {
  console.log("Queue Server is listening on port 8080");
});

app.use("/ping", new PingRouter().routes());

const socketController = new SocketController(io);

io.on("connect", (socket) => socketController.handleConnection(socket));

process.on("SIGINT", () => {
  console.log("Process is terminating. Closing all WebSockets.");

  socketController.onExit().then(() => process.exit(0));
});
