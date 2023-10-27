import { useRouter } from "next/router";
import useQuestionById from "@/hook/useQuestionById";
import { useEffect, useState } from "react";
import useSessionUser from "@/hook/useSessionUser";
import QuestionWorkspace from "@/components/questions/questionPage/QuestionWorkspace";
import { Language } from "@/utils/enums/Language";

export default function Session() {
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role);
  const sessionID = useRouter().query.sessionId as string;
  const questionId = "6509aea00cbd6c2179ad44d2"; // hardcoded, to be changed
  const { question } = useQuestionById(questionId, userRole);
  const languageSelected = Language.javascript; // hardcoded, to be changed

  useEffect(() => {
    setUserRole(sessionUser.role);
  }, [sessionUser]);

  return (
    <div>
      {question && (
        <QuestionWorkspace question={question} sessionId={sessionID} initialLanguage={languageSelected} />
      )}
    </div>
  );
}
