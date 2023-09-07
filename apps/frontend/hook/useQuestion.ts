import React, { useEffect, useState } from 'react'
import { Question } from '../type/Question';
import { mockQuestions } from '../components/MockQuestions';
import { getAllQuestions } from "../src/utils/database/question/Question";

function useQuestion() {
    const [questions, setQuestions] = useState<Question[]>([]);
    useEffect(() => {
      getAllQuestions().then((questions) => {
        setQuestions(questions);
      });
    }, [])
    return {questions, setQuestions}
}

export default useQuestion