import { Server } from "socket.io";
import { MONGODB_URI, PORT } from "./utils/config";
import mongoose from "mongoose";
import express, { json } from "express";
import MessageController from "./controllers/messageController";
import { chatroomRouter } from "./routes/chatroomRouter";

const app = express();
const io = new Server(app.listen(PORT), {});

const messageController = new MessageController(io);

io.on("connect", (socket) => messageController.handleConnection(socket));
app.use(json());
app.use(chatroomRouter);

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
