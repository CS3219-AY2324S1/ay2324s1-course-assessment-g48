import React from 'react';
import QuestionWorkspace from '@/components/questions/QuestionWorkspace';
import useQuestionById from '@/hook/useQuestionById';

type QuestionPageProps = {
  
};

const QuestionPage: React.FC<QuestionPageProps> = () => {
  const { question, isLoading, error } = useQuestionById();
  return <div className='flex h-screen overflow-y-auto'>
    {question && <QuestionWorkspace question={question} />}
  </div>
}
export default QuestionPage;