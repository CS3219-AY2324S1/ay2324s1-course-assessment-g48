import { useRouter } from "next/router";
import useQuestionById from "@/hook/useQuestionById";
import { useEffect, useState } from "react";
import useSessionUser from "@/hook/useSessionUser";
import QuestionWorkspace from "@/components/questions/questionPage/QuestionWorkspace";
import { languageOptions } from "@/utils/constants/LanguageOptions";

export default function Session() {
  const { sessionUser } = useSessionUser();
  const [accessToken, setAccessToken] = useState(sessionUser.accessToken);
  const sessionID = useRouter().query.sessionId as string;
  const questionId = "6543bccc951bbb058fd8c8ed"; // hardcoded, to be changed
  const { question } = useQuestionById(questionId, accessToken);
  const languageSelected = languageOptions[0]; // hardcoded, to be changed

  useEffect(() => {
    console.log(sessionID)
    setAccessToken(sessionUser.accessToken);
  }, [sessionUser]);

  return (
    <div>
      {question && (
        <QuestionWorkspace question={question} sessionId={sessionID} initialLanguage={languageSelected} />
      )}
    </div>
  );
}
