import mongoose, { Document, Schema } from "mongoose";

interface Session extends Document {
  users: number[];
  chatroomId: string;
  code: string;
}

const sessionSchema = new Schema({
  id: String,
  users: [
    {
      type: Number,
      required: true,
    },
  ],
  chatroomId: {
    type: String,
    required: true,
  },
  code: {
    type: String,
  },
});

const SessionModel = mongoose.model<Session>(
  "Session",
  sessionSchema,
  "sessions"
);

export default SessionModel;
