import { NextFunction, Request, Response } from "express";
import ChatroomService from "../services/chatroomService";

class ChatroomController {
  chatroomService: ChatroomService;

  constructor() {
    this.chatroomService = new ChatroomService();
  }
  async handleCreateChatroom(req: Request, res: Response, next: NextFunction) {
    const users = req.body.users;
    try {
      const chatroom = await this.chatroomService.createNewChatroom(users);
      res.status(200).json({ chatroomId: chatroom.id });
    } catch (e) {
      res.status(500).json({ err: "Something went wrong!" });
    }
  }
}

export default ChatroomController;
