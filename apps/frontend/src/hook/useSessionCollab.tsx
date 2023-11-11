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
  console.log("1", sessionId)
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
  const [users, setUsers] = useState<number[]>([])
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
      console.log("2", sessionId)
      const session = await getSession(sessionId).then(res => {
        return res
      });
      console.log(session.docId);
      console.log(session.chatroomId);
      console.log("docId received");
      console.log(session);
      setQuestionId(session.question);
      setUsers(session.users)
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

  return { question, doc, chatroomId, isLoading, increment, language, users };
}

export default useSessionCollab;
