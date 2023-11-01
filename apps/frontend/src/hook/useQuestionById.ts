import { Question } from "@/database/question/entities/question.entity";
import { getQuestionById } from "@/database/question/questionService";
import { Role } from "@/utils/enums/Role";
import { useEffect, useState } from "react";
import { useError } from "./ErrorContext";

function useQuestionById(qid: string, userRole?: Role) {
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const { setError } = useError();

  useEffect(() => {
    async function fetchData() {
      if (qid) {
        setIsLoading(true);
        if (userRole === Role.Unknown) return;
        try {
          const data = await getQuestionById(qid, userRole);
          setQuestion(data);
          setIsLoading(false);
        } catch (error) {
          setError({
            type: 1,
            message: `Error fetching question:, ${error}`});
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, [qid, userRole]);

  return { question, isLoading };
}

export default useQuestionById;
