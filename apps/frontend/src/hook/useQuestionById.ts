import { Question } from "@/database/question/entities/question.entity";
import { getQuestionById } from "@/database/question/questionService";
import { Role } from "@/utils/enums/Role";
import { useEffect, useState } from "react";

function useQuestionById(qid: string, userRole?: Role) {
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (qid) {
        setIsLoading(true);
        setError(null);
        if (userRole === Role.Unknown) return;
        try {
          const data = await getQuestionById(qid, userRole);
          setQuestion(data);
          setIsLoading(false);
        } catch (error) {
          setError(`Error fetching question:, ${error}`);
          setIsLoading(false);
        }
      }
    }

    fetchData();
  }, [qid, userRole]);

  return { question, isLoading, error };
}

export default useQuestionById;
