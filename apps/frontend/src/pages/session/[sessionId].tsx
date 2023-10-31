import { useRouter } from "next/router";
import useQuestionById from "@/hook/useQuestionById";
import { useEffect, useState } from "react";
import useSessionUser from "@/hook/useSessionUser";
import QuestionWorkspace from "@/components/questions/questionPage/QuestionWorkspace";

export default function Session() {
  const { sessionUser } = useSessionUser();
  const [accessToken, setAccessToken] = useState(sessionUser.accessToken);
  const sessionID = useRouter().query.sessionId as string;
  const questionId = "6509aea00cbd6c2179ad44d2"; // hardcoded, to be changed
  const { question } = useQuestionById(questionId, accessToken);

  useEffect(() => {
    console.log(sessionID)
    setAccessToken(sessionUser.accessToken);
  }, [sessionUser]);

  return (
    <div>
      {question && (
        <QuestionWorkspace question={question} sessionId={sessionID} />
      )}
    </div>
  );
}
