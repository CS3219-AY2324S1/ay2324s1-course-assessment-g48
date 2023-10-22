import { useRouter } from "next/router";
import SessionQuestionWorkspace from "@/components/questions/questionPage/SessionQuestionWorkspace";
import useQuestionById from "@/hook/useQuestionById";
import { useEffect, useState } from "react";
import useSessionUser from "@/hook/useSessionUser";

export default function Session() {
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser == null ? null : sessionUser?.role);
  const sessionID = useRouter().query.sessionId as string;
  const questionId = "6509aea00cbd6c2179ad44d2";
  const { question } = useQuestionById(questionId, userRole);
  
  useEffect(() => {
    setUserRole(sessionUser == null ? null : sessionUser?.role);
  }, [sessionUser]);

  return (
    <div>
      {question && (
        <SessionQuestionWorkspace question={question} sessionId={sessionID} />
      )}
    </div>
  );
}
