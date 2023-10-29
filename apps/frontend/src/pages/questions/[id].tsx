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
  const [userRole, setUserRole] = useState(sessionUser.role);
  const { question } = useQuestionById(qid as string, userRole);

  useEffect(() => {
    setUserRole(sessionUser.role);
  }, [sessionUser]);

  return (
    <div className="flex h-[calc(100vh-60px)]">
      {question && <QuestionWorkspace question={question} />}
    </div>
  );
};
export default QuestionPage;
