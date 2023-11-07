import mongoose, { Document, Schema } from "mongoose";
import { messageSchema, Message } from "./Message";

interface Chatroom extends Document {
  users: number[];
  messages: Message[];
}

const chatroomSchema = new Schema({
  users: [
    {
      type: Number,
      required: true,
    },
  ],
  messages: {
    type: [messageSchema],
    required: true,
  },
});

const ChatroomModel = mongoose.model<Chatroom>("Chatroom", chatroomSchema);

export default ChatroomModel;
