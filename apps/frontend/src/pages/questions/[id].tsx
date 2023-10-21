import React, { useState } from 'react';
import useQuestionById from '@/hook/useQuestionById';
import QuestionWorkspace from '@/components/questions/questionPage/QuestionWorkspace';
import { useRouter } from 'next/router';
import useSessionUser from '@/hook/useSessionUser';
import { Role } from '@/utils/enums/Role';

type QuestionPageProps = {
  
};

const QuestionPage: React.FC<QuestionPageProps> = () => {
  const router = useRouter();
  const qid = router.query.id;
  const { sessionUser } = useSessionUser();
  const [userRole] = useState(sessionUser.role ?? Role.Normal);
  const { question } = useQuestionById(qid as string, userRole);
  
  return <div className='flex h-screen overflow-y-auto'>
    {question && <QuestionWorkspace question={question} />}
  </div>
}
export default QuestionPage;