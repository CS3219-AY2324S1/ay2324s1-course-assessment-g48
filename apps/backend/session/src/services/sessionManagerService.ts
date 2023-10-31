import crypto from "crypto";
import { Repo, isValidAutomergeUrl } from "@automerge/automerge-repo";
import axios from "axios";
import { CHAT_URL } from "../utils/config.ts";

export type Doc = { text: string };

export class SessionManagerService {
  private sessionToUserMap: Map<
    string,
    { users: number[]; docId: string; chatroomId: string }
  >;
  private repo: Repo;

  constructor(serverRepo: Repo) {
    this.sessionToUserMap = new Map();
    this.repo = serverRepo;
  }

  public async createNewSession(user1: number, user2: number) {
    let sessionId = this.generateSessionId();

    // check if sessionId is valid (no duplicates)
    while (this.sessionToUserMap.has(sessionId)) {
      sessionId = this.generateSessionId();
    }

    const handle = isValidAutomergeUrl(sessionId)
      ? this.repo.find<Doc>(sessionId)
      : this.createDoc();
    // console.info("handle", handle);

    // blocks until doc is ready
    await handle.whenReady();

    const chatroomId = await this.createNewChatroom([user1, user2]);

    this.sessionToUserMap.set(sessionId, {
      users: [user1, user2],
      docId: handle.url,
      chatroomId,
    });

    console.log(chatroomId);

    return sessionId;
  }

  private createDoc() {
    const doc = this.repo.create<Doc>();
    doc.change((d) => (d.text = ""));
    return doc;
  }

  private async createNewChatroom(users: number[]) {
    return axios
      .post(CHAT_URL, { users })
      .then((res) => res.data.chatroomId)
      .catch((err) => console.error(err));
  }

  private generateSessionId() {
    return crypto.randomBytes(16).toString("base64url");
  }

  public getDoc(sessionID: string) {
    if (!this.sessionToUserMap.has(sessionID)) {
      console.log("panic");
      return;
    }
    return this.sessionToUserMap.get(sessionID)?.docId;
  }

  public clearAllSessions() {
    const sessions = Object.entries(this.sessionToUserMap);
    for (const session of sessions) {
      console.log(session);
    }
  }
}
