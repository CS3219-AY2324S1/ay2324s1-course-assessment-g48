import Chatroom from "../model/Chatroom";
import { Message } from "../model/Message";

export class MessageService {
  public async getMessages(chatroomId: string) {
    const chatroom = await Chatroom.findById(chatroomId);
    console.log(chatroom);

    return chatroom?.messages ?? [];
  }

  public async appendMessages(chatroomId: string, messages: Message[]) {
    const chatroom = await Chatroom.findByIdAndUpdate(chatroomId, {
      $push: { messages: { $each: messages } },
    });
  }
}
