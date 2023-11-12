import { Question } from "@/database/question/entities/question.entity";
import { getQuestionById } from "@/database/question/questionService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useError } from "./ErrorContext";
import useSessionUser from "./useSessionUser";

function useQuestionById(qid: string) {
  const { update } = useSession();
  const { isLoadingUser, sessionUser } = useSessionUser();
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);
  const [question, setQuestion] = useState<Question | null>(null);
  const { setError, clearError } = useError();

  useEffect(() => {
    async function fetchData() {
      if (!qid) {
        setError({
          type: 1,
          message: "No question id provided",
        });
        setIsLoadingQuestion(false);
      }
      clearError();
      if (isLoadingUser) return;
      try {
        const data = await getQuestionById(
          qid,
          sessionUser.accessToken,
          sessionUser.refreshToken
        );
        if (data.accessToken) {
          update({ accessToken: data.accessToken });
        }
        setQuestion(data);
        setIsLoadingQuestion(false);
      } catch (error) {
        setError({
          type: 1,
          message: `Error fetching question:, ${error}`,
        });
        setIsLoadingQuestion(false);
      }
    }
    fetchData();
  }, [qid, update, isLoadingUser]);

  return !isLoadingQuestion
    ? { question, isLoadingQuestion }
    : {
        question: undefined,
        isLoadingQuestion,
      };
}

export default useQuestionById;
