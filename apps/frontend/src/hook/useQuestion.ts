import React, { useEffect } from 'react'
import { Question } from '../components/Question';
import { mockQuestions } from '../components/MockQuestions';
import { getAllQuestions } from "../utils/database/question/Question";

function useQuestion() {
    const [questions, setQuestions] = React.useState<Question[]>(mockQuestions);
    
    useEffect(() => {
      getAllQuestions().then((questions) => {
        setQuestions(questions);
      });
    }, [])
    return {questions, setQuestions}
}

export default useQuestion