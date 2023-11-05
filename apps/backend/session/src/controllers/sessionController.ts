import { NextFunction, Request, Response } from "express";
import { SessionManagerService } from "../services/sessionManagerService.ts";
import { Repo, RepoConfig } from "@automerge/automerge-repo";
import { NodeWSServerAdapter } from "@automerge/automerge-repo-network-websocket";
import logger from "../utils/logger.ts";
import { WebSocketServer } from "ws";

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
    const sessionId = await this.sessionManager.createNewSession(user1, user2);
    console.log(`Created a sessionId: ${sessionId}`);
    res.status(200).json({ sessionId: sessionId.toString() });
  }

  public async getSession(req: Request, res: Response, next: NextFunction) {
    const sessionId = req.params.sessionId;
    const docId = await this.sessionManager.getDoc(sessionId);

    console.log(`getting session with SessionId of ${sessionId}`);

    if (!docId) {
      return res.status(404).json({ err: "No document found" });
    }
    console.log(`Found docId ${docId} for ${sessionId} `);
    return res.status(200).json({ docId });
  }

  public clearAllSessions(req: Request, res: Response, next: NextFunction) {
    this.sessionManager.clearAllSessions();
    res.status(200).json({ msg: "cleared" });
  }
}
