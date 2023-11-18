import { useEffect, useState } from "react";
import { getAllQuestions } from "../database/question/questionService";
import { Question } from "@/database/question/entities/question.entity";
import { useSession } from "next-auth/react";
import useSessionUser from "./useSessionUser";

function useQuestions() {
  const { update } = useSession();
  const { sessionUser, isLoadingUser } = useSessionUser();
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [trigger, setTrigger] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const handleTrigger = () => {
    setTrigger(!trigger); // Toggles the trigger state
  };

  useEffect(() => {
    setIsLoadingQuestion(true);
    if (isLoadingUser) return;
    getAllQuestions(sessionUser.accessToken, sessionUser.refreshToken)
      .then((questions) => {
        if (questions.accessToken) {
          update({
            accessToken: questions.accessToken,
            accessTokenExpiry: questions.accessTokenExpiry,
          });
        }
        setQuestions(questions);
        setTotalQuestions(questions.length);
        setTimeout(() => {
          setIsLoadingQuestion(false);
        }, 50);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [
    isLoadingUser,
    sessionUser.accessToken,
    sessionUser.refreshToken,
    trigger,
    update,
  ]);
  return {
    questions,
    totalQuestions,
    setQuestions,
    isLoadingQuestion,
    handleTrigger,
  };
}

export default useQuestions;
