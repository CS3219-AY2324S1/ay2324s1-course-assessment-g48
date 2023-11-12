import Router, { Express } from "express";
import { SessionController } from "../controllers/sessionController.ts";
import { WebSocketServer } from "ws";
import mongoose from "mongoose";
import { jwtGuard } from "../guards/jwtGuard.ts";
import { sessionGuard } from "../guards/sessionGuard.ts";

export class SessionRouter {
  public router: Express;

  constructor(wss: WebSocketServer) {
    this.router = Router();

    const sessionController = new SessionController(wss);

    this.router.post("/create-session", (req, res, next) =>
      sessionController.createSessionHandler(req, res, next)
    );

    this.router.get(
      "/get-session/:sessionId",
      jwtGuard,
      sessionGuard,
      (req, res, next) => sessionController.getSessionHandler(req, res, next)
    );

    this.router.post("/clear", (req, res, next) =>
      sessionController.clearAllSessions(req, res, next)
    );

    this.router.get("/user/:user", jwtGuard, (req, res, next) =>
      sessionController.handleGetSessionsForUser(req, res, next)
    );

    process.on("SIGINT", () => {
      console.log("SIGINT");
      sessionController.handleCleanup().then((res) => process.exit(0));
    });

    // process.on("uncaughtException", () => {
    //   //   sessionController.saveToDatabase();
    //   sessionController.handleCleanup().then((res) => process.exit(0));
    // });

    setInterval(() => sessionController.saveToDatabase(), 1000 * 60 * 60);
  }
}
