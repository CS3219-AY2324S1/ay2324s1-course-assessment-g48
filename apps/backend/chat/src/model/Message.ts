import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  uid: number;
  content: string;
  timestamp: Date;
}

export const messageSchema = new Schema({
  uid: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const MessageModel = mongoose.model<Message>("Message", messageSchema);

export default MessageModel;
