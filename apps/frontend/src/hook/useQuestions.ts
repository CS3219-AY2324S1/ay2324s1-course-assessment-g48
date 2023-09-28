import { useEffect, useState } from "react";
import { getAllQuestions } from "../database/question/questionService";
import { Question } from "@/database/question/entities/question.entity";

function useQuestion() {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [trigger, setTrigger] = useState(false);
  const handleTrigger = () => {
    setTrigger(!trigger); // Toggles the trigger state
  };

  useEffect(() => {
    setIsLoading(true);
    getAllQuestions().then((questions) => {
      setQuestions(questions);
      setTimeout(() => {
        setIsLoading(false);
      }, 50)
      
    }).catch((error) => {
    console.error(error);
    });
  }, [trigger]);
  return { questions, setQuestions, isLoading, handleTrigger };
}

export default useQuestion;