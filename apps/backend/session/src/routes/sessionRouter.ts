import Router, { Express } from "express";
import { SessionController } from "../controllers/sessionController.ts";
import { WebSocketServer } from "ws";

export class SessionRouter {
  public router: Express;

  constructor(wss: WebSocketServer) {
    this.router = Router();

    const sessionController = new SessionController(wss);

    this.router.post("/create-session", (req, res, next) =>
      sessionController.createSessionHandler(req, res, next)
    );

    this.router.get("/get-session/:sessionId", (req, res, next) => {
      console.log("get-session!!!!!!!!!", req.params.sessionId);
      sessionController.getSession(req, res, next);
    });

    this.router.post("/clear", (req, res, next) =>
      sessionController.clearAllSessions(req, res, next)
    );
  }
}
