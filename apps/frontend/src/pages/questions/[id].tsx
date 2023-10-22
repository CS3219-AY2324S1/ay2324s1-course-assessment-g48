import React, { useEffect, useState } from 'react';
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
  const [userRole, setUserRole] = useState(sessionUser == null ? null : sessionUser?.role);
  const { question } = useQuestionById(qid as string, userRole);

  useEffect(() => {
    setUserRole(sessionUser == null ? null : sessionUser?.role);
  }, [sessionUser]);

  
  return <div className='flex h-[calc(100vh-65px)]'>
    {question && <QuestionWorkspace question={question} />}
  </div>
}
export default QuestionPage;