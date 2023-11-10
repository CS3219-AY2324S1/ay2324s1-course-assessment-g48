import { useEffect, useState } from "react";
import { getAllQuestions } from "../database/question/questionService";
import { Question } from "@/database/question/entities/question.entity";
import { useSession } from "next-auth/react";

function useQuestions(accessToken?: string | null, refreshToken?: string | null) {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [trigger, setTrigger] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  
  const handleTrigger = () => {
    setTrigger(!trigger); // Toggles the trigger state
  };

  useEffect(() => {
    setIsLoading(true);
    if (accessToken === null || refreshToken === null) return;
    getAllQuestions(accessToken, refreshToken).then((questions) => {
      if (questions.accessToken) {
        update({ accessToken: questions.accessToken });
      }
      setQuestions(questions);
      setTotalQuestions(questions.length);
      setTimeout(() => {
        setIsLoading(false);
      }, 50)
      
    }).catch((error) => {
    console.error(error);
    });
  }, [accessToken, refreshToken, session, trigger]);
  return { questions, totalQuestions, setQuestions, isLoading, handleTrigger };
}

export default useQuestions;
