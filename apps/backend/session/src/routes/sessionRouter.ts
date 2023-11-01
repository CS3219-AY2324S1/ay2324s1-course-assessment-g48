import Router, { Express } from "express";
import { SessionController } from "../controllers/sessionController.ts";
import { WebSocketServer } from "ws";
import mongoose from "mongoose";

export class SessionRouter {
  public router: Express;

  constructor(wss: WebSocketServer) {
    this.router = Router();

    const sessionController = new SessionController(wss);

    this.router.post("/create-session", (req, res, next) =>
      sessionController.createSessionHandler(req, res, next)
    );

    this.router.get("/get-session/:sessionId", (req, res, next) =>
      sessionController.getSessionHandler(req, res, next)
    );

    this.router.post("/clear", (req, res, next) =>
      sessionController.clearAllSessions(req, res, next)
    );

    process.on("SIGINT", () => {
      sessionController.handleCleanup().then((res) => process.exit(0));
    });

    process.on("uncaughtException", () => {
      //   sessionController.saveToDatabase();
      sessionController.handleCleanup().then((res) => process.exit(0));
    });

    setInterval(() => sessionController.saveToDatabase(), 1000 * 60 * 60);
  }
}
