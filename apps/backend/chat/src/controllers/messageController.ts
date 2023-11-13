import { Server, Socket } from "socket.io";
import { Message } from "../model/Message";
import { MessageService } from "../services/messageService";

class MessageController {
  chatroomService: MessageService;
  io: Server;

  constructor(io: Server) {
    this.chatroomService = new MessageService();
    this.io = io;
  }

  handleConnection(socket: Socket) {
    socket.on("connectToChatroom", async ({ chatroomId }) => {
      socket.join(chatroomId);
      const messages = await this.chatroomService.getMessages(chatroomId);
      console.log(messages);
      socket.emit("receiveMessage", { messages });
      socket.on("sendMessage", (message) =>
        this.handleSendMessage(message, chatroomId)
      );
    });
    socket.emit("connected");
  }

  handleSendMessage(message: Message, chatroomId: string) {
    console.log(message);
    this.chatroomService.appendMessages(chatroomId, [message]);
    this.io.to(chatroomId).emit("receiveMessage", { messages: [message] });
  }
}

export default MessageController;
