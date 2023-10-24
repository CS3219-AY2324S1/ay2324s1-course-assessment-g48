import { useEffect, useState } from "react";
import { getAllQuestions } from "../database/question/questionService";
import { Question } from "@/database/question/entities/question.entity";
import { Role } from "@/utils/enums/Role";

function useQuestions(userRole?: Role) {
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [trigger, setTrigger] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const handleTrigger = () => {
    setTrigger(!trigger); // Toggles the trigger state
  };

  useEffect(() => {
    setIsLoading(true);
    if (userRole === Role.Unknown) return;
    getAllQuestions(userRole).then((questions) => {
      setQuestions(questions);
      setTotalQuestions(questions.length);
      setTimeout(() => {
        setIsLoading(false);
      }, 50)
      
    }).catch((error) => {
    console.error(error);
    });
  }, [trigger, userRole]);
  return { questions, totalQuestions, setQuestions, isLoading, handleTrigger };
}

export default useQuestions;
