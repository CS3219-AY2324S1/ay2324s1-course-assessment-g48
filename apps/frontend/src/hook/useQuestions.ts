import { useEffect, useState } from "react";
import { getAllQuestions } from "../database/question/questionService";
import { Question } from "@/database/question/entities/question.entity";

function useQuestions(accessToken?: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [trigger, setTrigger] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const handleTrigger = () => {
    setTrigger(!trigger); // Toggles the trigger state
  };

  useEffect(() => {
    setIsLoading(true);
    if (accessToken === null) return;
    getAllQuestions(accessToken).then((questions) => {
      setQuestions(questions);
      setTotalQuestions(questions.length);
      setTimeout(() => {
        setIsLoading(false);
      }, 50)
      
    }).catch((error) => {
    console.error(error);
    });
  }, [accessToken, trigger]);
  return { questions, totalQuestions, setQuestions, isLoading, handleTrigger };
}

export default useQuestions;
