import { NextFunction, Request, Response } from "express";
import { SessionManagerService } from "../services/sessionManagerService.ts";
import { Repo, RepoConfig } from "@automerge/automerge-repo";
import { NodeWSServerAdapter } from "@automerge/automerge-repo-network-websocket";
import logger from "../utils/logger.ts";
import { WebSocketServer } from "ws";
import mongoose from "mongoose";

export class SessionController {
  private sessionManager: SessionManagerService;

  constructor(wss: WebSocketServer) {
    const adapter = new NodeWSServerAdapter(wss);

    const config: RepoConfig = {
      network: [adapter],
    };
    const serverRepo = new Repo(config);
    this.sessionManager = new SessionManagerService(serverRepo);
  }

  public async createSessionHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    logger.info(req.body);
    const [user1, user2] = req.body.users;
    const difficulty = req.body.difficulty;
    const language = req.body.language;
    const sessionId = await this.sessionManager.createNewSession(
      user1,
      user2,
      difficulty,
      language
    );
    console.log(`Created a sessionId: ${sessionId}`);
    res.status(200).json({ sessionId: sessionId.toString() });
  }

  public async getSessionHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const sessionId = req.params.sessionId;
    const sessionWithDoc = await this.sessionManager.getDocId(sessionId);

    console.log(`getting session with SessionId of ${sessionId}`);

    if (!sessionWithDoc) {
      return res.status(404).json({ err: "No session found" });
    }

    if (!sessionWithDoc.docId) {
      return res.status(404).json({ err: "No document found" });
    }
    console.log(`Found docId ${sessionWithDoc.docId} for ${sessionId} `);
    return res.status(200).json(sessionWithDoc);
  }

  public clearAllSessions(req: Request, res: Response, next: NextFunction) {
    this.sessionManager.clearAllSessions();
    res.status(200).json({ msg: "cleared" });
  }

  public async handleCleanup() {
    await this.saveToDatabase().then((res) => mongoose.disconnect());
  }

  public async saveToDatabase() {
    console.log("Saving to database");
    await this.sessionManager.saveToDatabase();
  }

  public async handleGetSessionsForUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const uid = Number(req.params.user);
    const { startIndex, endIndex } = req.body
    if (!uid) {
      return res.status(500).json({ err: "UID passed in was not valid." });
    }
    const sessions = await this.sessionManager.getAllSessionsForUser(uid, Number(startIndex), Number(endIndex));
    if (!sessions) {
      return res.status(500).json({
        err: "Something went wrong when searching for the sessions for this user.",
      });
    }
    return res.status(200).json({ sessions });
  }
}
