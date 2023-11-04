import { Server } from "socket.io";
import { MONGODB_URI, PORT } from "./utils/config";
import mongoose from "mongoose";
import express, { json } from "express";
import MessageController from "./controllers/messageController";
import { chatroomRouter } from "./routes/chatroomRouter";
import cors from "cors";

const app = express();
const io = new Server(app.listen(PORT), {
  cors: {
    origin: "*",
  },
});

const messageController = new MessageController(io);

io.on("connect", (socket) => messageController.handleConnection(socket));
app.use(json());
app.use(chatroomRouter);

const allowedOrigins: string[] = [
  "http://localhost",
  "http://localhost:80",
  "http://localhost:3000",
  "http://localhost:8000",
  "http://localhost:8080",
  "http://localhost:8001",
  "http://localhost:8022",
  "http://localhost:8500",
  "http://localhost:9000",
  "http://peerprep-user:8001",
  "http://peerprep-question:8000",
  "http://peerprep-frontend:3000",
];

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

mongoose
  .connect(MONGODB_URI || "")
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

process.on("SIGINT", () => {
  console.log("Process is terminating. Closing all WebSockets.");
  mongoose.disconnect();
  io.fetchSockets().then((sockets) =>
    sockets.forEach((socket) => socket.disconnect())
  );
});
