import { useRouter } from "next/router";
import SessionQuestionWorkspace from "@/components/questions/questionPage/SessionQuestionWorkspace";
import useQuestionById from "@/hook/useQuestionById";
import { useEffect, useState } from "react";
import useSessionUser from "@/hook/useSessionUser";

export default function Session() {
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role);
  const sessionID = useRouter().query.sessionId as string;
  const questionId = "653befbb9797de9bd0b4ba92"; // hardcoded, to be changed
  const { question } = useQuestionById(questionId, userRole);

  useEffect(() => {
    console.log(sessionID)
    setUserRole(sessionUser.role);
  }, [sessionUser]);

  return (
    <div>
      {question && (
        <SessionQuestionWorkspace question={question} sessionId={sessionID} />
      )}
    </div>
  );
}
