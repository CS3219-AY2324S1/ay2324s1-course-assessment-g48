import { Server } from "socket.io";
import { MONGODB_URI, PORT } from "./utils/config";
import Chatroom from "./model/Chatroom";
import mongoose from "mongoose";
import { ChatroomService } from "./services/ChatroomService";

const io = new Server(PORT, {});

const chatroomService = new ChatroomService();

io.on("connect", (socket) => {
  socket.on("connectToChatroom", async ({ chatroomId }) => {
    socket.join(chatroomId);
    const messages = await chatroomService.getMessages(chatroomId);
    console.log(messages);
    socket.emit("receiveMessage", { messages });
    socket.on("sendMessage", (message) => {
      console.log(message);
      chatroomService.appendMessages(chatroomId, [message]);
      io.to(chatroomId).emit("receiveMessage", { messages: [message] });
    });
  });
  socket.emit("connected");
});

mongoose
  .connect(MONGODB_URI || "")
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

// const chatroom = new Chatroom({
//   messages: [{ timestamp: new Date(), uid: 1, content: "HELLO" }],
//   users: [],
// });
// console.log(chatroom);
// chatroom.save();
// console.log(`added ${JSON.stringify(chatroom)}`);
