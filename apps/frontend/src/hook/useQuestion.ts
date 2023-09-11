import { useEffect, useState } from "react";
import { getAllQuestions } from "../database/question/questionService";
import { mockQuestions } from "@/utils/mock-questions/MockQuestions";
import { Question } from "../../type/Question";

function useQuestion() {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getAllQuestions().then((questions) => {
      setQuestions(questions);
      setIsLoading(false);
    });
  }, []);
  return { questions, setQuestions, isLoading };
}

export default useQuestion;
