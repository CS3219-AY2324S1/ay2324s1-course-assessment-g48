import { useEffect, useState } from "react";
import { getAllQuestions } from "../database/question/questionService";
import { Question } from "../../type/Question";

function useQuestion() {
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [trigger, setTrigger] = useState(false);
  const handleTrigger = () => {
    setTrigger(!trigger); // Toggles the trigger state
  };

  useEffect(() => {
    setIsLoading(true);
    getAllQuestions().then((questions) => {
      setQuestions(questions);
      setIsLoading(false);
    });
  }, [trigger]);
  return { questions, setQuestions, isLoading, handleTrigger };
}

export default useQuestion;
