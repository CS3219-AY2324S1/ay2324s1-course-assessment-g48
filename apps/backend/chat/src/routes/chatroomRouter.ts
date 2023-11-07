import { Router } from "express";
import ChatroomController from "../controllers/chatroomController";

export const chatroomRouter = Router();

const chatroomController = new ChatroomController();

chatroomRouter.post("/create-chatroom", (req, res, next) =>
  chatroomController.handleCreateChatroom(req, res, next)
);
