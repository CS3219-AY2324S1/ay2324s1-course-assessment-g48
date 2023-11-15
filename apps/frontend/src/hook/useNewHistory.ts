import { HistoryQuestionTestcase } from "@/database/history/entities/history.entity";
import { postNewHistory } from "@/database/history/historyService";
import { useEffect, useState } from "react";
import useSessionUser from "./useSessionUser";
import { Question } from "@/database/question/entities/question.entity";
import { Language } from "@/utils/class/Language";
import { useSession } from "next-auth/react";
import { set } from "lodash";

export default function useNewHistory(
  question: Question,
  users: number[],
  sessionId: string
) {
  const { update } = useSession();
  const [historyTestCase, setHistoryTestCase] = useState<
    HistoryQuestionTestcase[]
  >([]);
  const [language, setLanguage] = useState<string>();
  const [code, setCode] = useState<string>();
  const [allSuccess, setAllSuccess] = useState<boolean>(false);
  const [completedComp, setCompletedComp] = useState<boolean>(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const { sessionUser } = useSessionUser();

  useEffect(() => {
    console.log("historyTestCase", historyTestCase);
    if (historyTestCase.length === 0) return;
    setIsLoadingHistory(true);
    const newCompletedQuestion = {
      questionId: question._id,
      questionTitle: question.title,
      language: language ?? "",
      answer: code ?? "",
      testcases: historyTestCase,
      completedAt: new Date(),
      result: allSuccess ? "Correct" : "Incorrect",
    };
    const newHistory = {
      userIds: users,
      sessionId: sessionId ?? String(users[0]),
      completed: [newCompletedQuestion],
      date: new Date(),
      _id: "",
    };
    postNewHistory(
      newHistory,
      sessionUser.accessToken!,
      sessionUser.refreshToken!
    )
      .then((data) => {
        if (data.accessToken) {
          update({
            accessToken: data.accessToken,
            accessTokenExpiry: data.accessTokenExpiry,
          });
        }
        setCompletedComp(false);
        setHistoryTestCase([]);
        console.log("data", data);
        setIsLoadingHistory(false);
      })
      .catch((err) => {
        console.error("error", err);
      });
  }, [completedComp]);

  return {
    setHistoryTestCase,
    setLanguage,
    setCode,
    setAllSuccess,
    isLoadingHistory,
    setCompletedComp
  };
}
