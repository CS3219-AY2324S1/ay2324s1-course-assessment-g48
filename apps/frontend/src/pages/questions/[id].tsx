import React, { useEffect, useState } from "react";
import useQuestionById from "@/hook/useQuestionById";
import QuestionWorkspace from "@/components/questions/questionPage/QuestionWorkspace";
import { useRouter } from "next/router";
import useSessionUser from "@/hook/useSessionUser";

type QuestionPageProps = {};

const QuestionPage: React.FC<QuestionPageProps> = () => {
  const router = useRouter();
  const qid = router.query.id;
  const { sessionUser } = useSessionUser();
  const [accessToken, setAccessToken] = useState(sessionUser.accessToken);
  const { question } = useQuestionById(qid as string, accessToken);

  useEffect(() => {
    setAccessToken(sessionUser.accessToken);
  }, [sessionUser]);

  return <div className='flex h-[calc(100vh-60px)]'>
    {question && <QuestionWorkspace question={question} />}
  </div>
}
export default QuestionPage;
