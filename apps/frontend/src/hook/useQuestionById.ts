import { Question } from "@/database/question/entities/question.entity";
import { getQuestionById } from "@/database/question/questionService";
import { useEffect, useState } from "react";

function useQuestionById(qid: string, accessToken?: string | null) {
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState<Question | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!qid) {
        setError("No question id provided");
        setIsLoading(false);
      }
      setError(null);
      if (accessToken === null) return;
      try {
        const data = await getQuestionById(qid, accessToken);
        setQuestion(data);
        setIsLoading(false);
      } catch (error) {
        setError(`Error fetching question:, ${error}`);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [qid, accessToken]);

  return !isLoading
  ? { question, isLoading, error }
  : {
      question: undefined,
      isLoading,
      error
    };
}

export default useQuestionById;
