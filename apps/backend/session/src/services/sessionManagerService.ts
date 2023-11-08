import crypto from "crypto";
import { Repo, isValidAutomergeUrl } from "@automerge/automerge-repo";
import axios from "axios";
import { CHAT_URL } from "../utils/config.ts";
import SessionModel from "../model/Session.ts";
import mongoose from "mongoose";

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
    const chatroomId =  "123" // await this.createNewChatroom([user1, user2]);
    const newSession = new SessionModel({
      users: [user1, user2],
      chatroomId,
      code: "",
    });
    await newSession
      .save()
      .then((session) => console.log(session))
      .catch((error) => console.error("Error saving session:", error));

    const sessionId = newSession._id.toString();
    const handle = this.getDoc(sessionId);
    // console.info("handle", handle);

    // blocks until doc is ready
    await handle.whenReady();

    this.sessionToUserMap.set(sessionId, {
      users: [user1, user2],
      docId: handle.url,
      chatroomId,
    });

    return sessionId;
  }

  private createDoc(pastCode?: string) {
    const doc = this.repo.create<Doc>();
    //TODO: Load original document from database.
    doc.change((d) => (d.text = pastCode ?? ""));
    return doc;
  }

  private async createNewChatroom(users: number[]) {
    return axios
      .post(CHAT_URL, { users })
      .then((res) => res.data.chatroomId)
      .catch((err) => console.error(err));
  }

  public async getDocId(sessionId: string) {
    if (!this.sessionToUserMap.has(sessionId)) {
      const session = await SessionModel.findById(sessionId);
      if (!session) {
        console.log("No session of this sessionId has been found");
        return;
      }
      const code = session?.code;
      const handle = this.createDoc(code);
      // console.info("handle", handle);
  
      // Wait for the document to be ready before accessing it
      await handle.whenReady();
      this.sessionToUserMap.set(sessionId, {
        
        users: session.users,
        docId: handle.url,
        chatroomId: session.chatroomId,
      });
    }
    return this.sessionToUserMap.get(sessionId);
  }

  public clearAllSessions() {
    const sessions = Object.entries(this.sessionToUserMap);
    for (const session of sessions) {
      console.log(session);
    }
  }

  private getDoc(sessionId: string) {
    return isValidAutomergeUrl(sessionId)
      ? this.repo.find<Doc>(sessionId)
      : this.createDoc();
  }

  public async saveToDatabase() {
    this.sessionToUserMap.forEach(async (map, sessionId) => {
      const { users, docId } = map;
      if (isValidAutomergeUrl(docId)) {
        const doc = this.repo.find<Doc>(docId);
        const value = (await doc.doc())?.text;
        console.log(value);
        console.log(docId);

        //TODO Save to database
        await SessionModel.updateOne(
          { _id: sessionId },
          { users, code: value }
        );
      }
    });
  }
}
