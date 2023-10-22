import { useRouter } from "next/router";
import SessionQuestionWorkspace from "@/components/questions/questionPage/SessionQuestionWorkspace";
import useQuestionById from "@/hook/useQuestionById";

export default function Session() {
  const sessionID = useRouter().query.sessionId as string;
  const questionId = "6509aea00cbd6c2179ad44d2";
  const { question } = useQuestionById(questionId);

  return (
    <div>
      {question && (
        <SessionQuestionWorkspace question={question} sessionId={sessionID} />
      )}
    </div>
  );
}
