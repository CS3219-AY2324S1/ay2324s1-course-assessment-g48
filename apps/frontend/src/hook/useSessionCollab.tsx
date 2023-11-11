import { useEffect, useState } from "react";
import { getAllQuestions } from "../database/question/questionService";
import { Question } from "@/database/question/entities/question.entity";
import { useSession } from "next-auth/react";
import { Language } from "@/utils/class/Language";
import { languageOptions } from "@/utils/constants/LanguageOptions";
import { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Doc } from "@automerge/automerge/next";
import axios from "axios";
import router, { useRouter } from "next/router";
import useQuestionById from "./useQuestionById";
import useSessionUser from "./useSessionUser";
import { getSession } from "@/database/session/sessionService";

function useSessionCollab(
  sessionId: string,
  accessToken?: string | null,
  refreshToken?: string | null
) {
  const [isLoading, setIsLoading] = useState(false);

  const { sessionUser } = useSessionUser();
  const [questionId, setQuestionId] = useState<string>("");
  const { question } = useQuestionById(
    questionId,
    sessionUser.accessToken,
    sessionUser.refreshToken
  );
  const [language, setLanguage] = useState<Language>(); // hardcoded, to be changed
  const [docUrl, setDocUrl] = useState<AutomergeUrl>();
  const [doc, changeDoc] = useDocument<Doc<any>>(docUrl);
  const [chatroomId, setChatroomId] = useState<string>("");
  let increment: (value: string) => void = (value: string) => {
    console.log("reflecting changes in code editor through changeDoc...");
    changeDoc((d: any) => (d.text = value));
  };

  useEffect(() => {
    async function fetchSession() {
      if (!accessToken || !refreshToken) {
        router.push("404");
        return;
      }

      const session = await getSession(sessionId, accessToken, refreshToken);
      console.log(session.docId);
      console.log(session.chatroomId);
      console.log("docId received");
      console.log(session);
      setQuestionId(session.question);
      setLanguage(
        languageOptions.filter((language) => language.id == session.language)[0]
      );
      setDocUrl(session.docId);
      setChatroomId(session.chatroomId);
    }
    setIsLoading(true);
    fetchSession();
    setIsLoading(false);
  }, [sessionId]);

  return { question, doc, chatroomId, isLoading, increment, language };
}

export default useSessionCollab;
