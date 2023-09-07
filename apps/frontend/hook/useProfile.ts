import React, { useEffect, useState } from 'react'

function useProfile() {
    const [questions, setQuestions] = useState<[]>([]);
    
    useEffect(() => {
    }, [])
    return {questions, setQuestions}
}

export default useProfile