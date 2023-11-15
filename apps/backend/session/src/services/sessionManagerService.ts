import crypto from "crypto";
import { Repo, isValidAutomergeUrl } from "@automerge/automerge-repo";
import axios from "axios";
import { CHAT_URL, QUESTION_URL } from "../utils/config.ts";
import SessionModel from "../model/Session.ts";
import mongoose from "mongoose";
import { Difficulty } from "../enums/Difficulty.ts";
import { ProgrammingLanguage } from "../enums/ProgrammingLanguage.ts";
import { languageOptions } from "../utils/languages/languageMap.ts";

export type Doc = { text: string };

export class SessionManagerService {
  private sessionToUserMap: Map<
    string,
    {
      users: number[];
      docId: string;
      chatroomId: string;
      question: string;
      language: number;
    }
  >;
  private repo: Repo;

  constructor(serverRepo: Repo) {
    this.sessionToUserMap = new Map();
    this.repo = serverRepo;
  }

  public async createNewSession(
    user1: number,
    user2: number,
    diff: Difficulty,
    language: ProgrammingLanguage
  ) {
    const chatroomId = await this.createNewChatroom([user1, user2]);
    const languageId = languageOptions.get(language);
    const questions = await this.getRandomQuestion(diff, language);
    console.log(questions);
    let questionId: string;
    if (!questions.length) {
      console.log(
        "For some reason a question with that specific language and complexity does not exist. Replacing questionId with default one"
      );
      questionId = "6544a293176b84aafd37817a";
    } else {
      questionId = questions[0]._id;
    }

    const newSession = new SessionModel({
      users: [user1, user2],
      chatroomId,
      code: questions[0].starterCode.filter(
        (starter) => starter.languageId == languageId
      )[0].code,
      question: questionId,
      language: languageId,
    });
    await newSession
      .save()
      .then((session) => console.log(session))
      .catch((error) => console.error("Error saving session:", error)); // May have error here

    const sessionId = newSession._id.toString();
    const handle = this.getDoc(sessionId);
    // console.info("handle", handle);

    // blocks until doc is ready
    await handle.whenReady();

    this.sessionToUserMap.set(sessionId, {
      users: [user1, user2],
      docId: handle.url,
      chatroomId,
      question: questionId,
      language: languageOptions.get(language) ?? 63,
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
    console.log("Creating new chatroom");
    return axios
      .post(CHAT_URL, { users })
      .then((res) => res.data.chatroomId)
      .catch((err) => console.error(err));
  }

  public async getDocId(sessionId: string) {
    console.log(`Getting docIdsad for ${sessionId}`);
    if (!this.sessionToUserMap.has(sessionId)) {
      const session = await SessionModel.findById(sessionId)
        .then((res) => {
          console.log("can get", res);
          return res;
        })
        .catch((err) => console.error("ERRRROR", err));
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
        question: session.question,
        language: Number(session.language),
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
        // console.log(value);
        // console.log(docId);
        console.log(`Saving ${sessionId} to database`);

        //TODO Save to database
        await SessionModel.updateOne(
          { _id: sessionId },
          { users, code: value }
        );
      }
    });
  }

  public async getAllSessionsForUser(
    uid: number,
    startIndex: number,
    endIndex: number
  ) {
    try {
      console.log("first", startIndex, endIndex)
      const sessions = await SessionModel.find({ users: uid })
        .skip(startIndex)
        .limit(endIndex - startIndex);
      return sessions;
    } catch (e) {
      console.error(e);
    }
  }

  public async getRandomQuestion(
    difficulty: Difficulty,
    language: ProgrammingLanguage
  ) {
    console.log(
      QUESTION_URL +
        `/api/question/random-question/${difficulty}/${languageOptions.get(
          language
        )}`
    );
    return axios
      .get(
        QUESTION_URL +
          `/api/question/random-question/${difficulty}/${languageOptions.get(
            language
          )}`
      )
      .then((res) => res.data.questions)
      .catch((err) => console.error(err));
  }
}
