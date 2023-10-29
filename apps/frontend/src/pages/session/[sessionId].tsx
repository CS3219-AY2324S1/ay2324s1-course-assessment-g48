import { useRouter } from "next/router";
import useQuestionById from "@/hook/useQuestionById";
import { useEffect, useState } from "react";
import useSessionUser from "@/hook/useSessionUser";
import QuestionWorkspace from "@/components/questions/questionPage/QuestionWorkspace";
import { languageOptions } from "@/utils/constants/LanguageOptions";

export default function Session() {
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role);
  const sessionID = useRouter().query.sessionId as string;
  const questionId = "6509aea00cbd6c2179ad44d2"; // hardcoded, to be changed
  const { question } = useQuestionById(questionId, userRole);
  const languageSelected = languageOptions[0]; // hardcoded, to be changed

  useEffect(() => {
    console.log(sessionID);
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
