import { Question } from "@/database/question/entities/question.entity";
import { getQuestionById } from "@/database/question/questionService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function useQuestionById(id?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const qid = id ?? router.query.id;
  useEffect(() => {
    async function fetchData() {
      if (qid) {
        setIsLoading(true);
        setError(null);

        try {
          const data = await getQuestionById(qid as string);
          setQuestion(data);
          setIsLoading(false);
        } catch (error) {
          setError(`Error fetching question:, ${error}`);
          setIsLoading(false);
        }
      }
    }

    fetchData();
  }, [qid]);

  return { question, isLoading, error };
}

export default useQuestionById;
