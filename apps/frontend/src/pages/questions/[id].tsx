import React from "react";
import useQuestionById from "@/hook/useQuestionById";
import QuestionWorkspace from "@/components/questions/questionPage/QuestionWorkspace";
import { useRouter } from "next/router";

type QuestionPageProps = {};

const QuestionPage: React.FC<QuestionPageProps> = () => {
  const router = useRouter();
  const qid = router.query.id;
  const { question } = useQuestionById(qid as string);
  return <>
    {question && <QuestionWorkspace question={question} />}
  </>
}
export default QuestionPage;
