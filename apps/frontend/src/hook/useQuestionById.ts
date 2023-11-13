import { Question } from "@/database/question/entities/question.entity";
import { getQuestionById } from "@/database/question/questionService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useError } from "./ErrorContext";

function useQuestionById(
  qid: string,
  accessToken?: string | null,
  refreshToken?: string | null
) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState<Question | null>(null);
  const { setError, clearError } = useError();

  useEffect(() => {
    async function fetchData() {
      if (!qid) {
        setError({
          type: 1,
          message: "No question id provided",
        });
        setIsLoading(false);
      }
      clearError();
      if (accessToken === null || refreshToken == null) return;
      try {
        const data = await getQuestionById(qid, accessToken, refreshToken);
        if (data.accessToken) {
          session!.user!.accessToken = data.accessToken;
          console.log("Refresh accessToken", session);
        }
        setQuestion(data);
        setIsLoading(false);
      } catch (error) {
        setError({
          type: 1,
          message: `Error fetching question:, ${error}`,
        });
        setIsLoading(false);
      }
    }
    fetchData();
  }, [qid, accessToken, refreshToken, session]);

  return !isLoading
    ? { question, isLoading }
    : {
        question: undefined,
        isLoading,
      };
}

export default useQuestionById;