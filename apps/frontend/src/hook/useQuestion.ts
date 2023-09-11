import { useEffect, useState } from 'react'
import { getAllQuestions } from "../utils/database/question/Question";
import { Question } from '@/components/Question';
import { mockQuestions } from '@/components/MockQuestions';

function useQuestion() {
  const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState<Question[]>(mockQuestions);
    
    useEffect(() => {
      setIsLoading(true);
      getAllQuestions().then((questions) => {
        setQuestions(questions);
      });
      setIsLoading(false);
    }, [])
    return {questions, setQuestions, isLoading}
}

export default useQuestion