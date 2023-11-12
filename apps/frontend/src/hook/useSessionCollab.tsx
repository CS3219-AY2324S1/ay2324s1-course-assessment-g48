import { useEffect, useState } from "react";
import {
  getAllQuestions,
  getQuestionById,
} from "../database/question/questionService";
import { Question } from "@/database/question/entities/question.entity";
import { Language } from "@/utils/class/Language";
import { languageOptions } from "@/utils/constants/LanguageOptions";
import { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Doc } from "@automerge/automerge/next";
import useSessionUser from "./useSessionUser";
import { getSession } from "@/database/session/sessionService";
import { useError } from "./ErrorContext";

function useSessionCollab(sessionId: string) {
  const [isLoading, setIsLoading] = useState(false);

  const { sessionUser, isLoading: isLoadingUser } = useSessionUser();
  const { accessToken, refreshToken } = sessionUser;
  //   const [questionId, setQuestionId] = useState<string>("");
  const [question, setQuestion] = useState<Question>();
  const [language, setLanguage] = useState<Language>(); // hardcoded, to be changed
  const [docUrl, setDocUrl] = useState<AutomergeUrl>();
  const [users, setUsers] = useState<number[]>([]);
  const [doc, changeDoc] = useDocument<Doc<any>>(docUrl);
  const [chatroomId, setChatroomId] = useState<string>("");
  let increment: (value: string) => void = (value: string) => {
    console.log("reflecting changes in code editor through changeDoc...");
    changeDoc((d: any) => (d.text = value));
  };

  useEffect(() => {
    async function fetchSession() {
      //   if (!accessToken || !refreshToken) {
      //     router.push("/404");
      //     return;
      //   }

      const session = await getSession(
        sessionId,
        String(accessToken),
        String(refreshToken)
      );
      console.log("Session got");
      if (!session) {
        return;
      }
      console.log(session.docId);
      console.log(session.chatroomId);
      console.log("docId received");
      console.log(session);
      session.question;
      setQuestion(
        await getQuestionById(
          session.question,
          sessionUser.accessToken!,
          sessionUser.refreshToken!
        )
      );
      setUsers(session.users);
      setLanguage(
        languageOptions.filter((language) => language.id == session.language)[0]
      );
      setDocUrl(session.docId);
      setChatroomId(session.chatroomId);
      console.log("Session:", session);
    }
    setIsLoading(true);
    if (!isLoadingUser && sessionId) {
      fetchSession().then((res) => setIsLoading(false));
    }
  }, [sessionId, isLoadingUser]);

  return { question, doc, chatroomId, isLoading, increment, language, users };
}

export default useSessionCollab;
