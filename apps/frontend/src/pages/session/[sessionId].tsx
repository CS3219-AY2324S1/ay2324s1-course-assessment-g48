import { useRouter } from "next/router";
import useQuestionById from "@/hook/useQuestionById";
import { useEffect, useState } from "react";
import useSessionUser from "@/hook/useSessionUser";
import { languageOptions } from "@/utils/constants/LanguageOptions";
import QuestionWorkspace from "@/components/questions/questionPage/QuestionWorkspace";
import { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Doc } from "@automerge/automerge/next";
import axios from "axios";

export default function Session() {
  const router = useRouter();

  const { sessionUser } = useSessionUser();

  const sessionID = useRouter().query.sessionId as string;
  const questionId = "6544a293176b84aafd37817a"; // hardcoded, to be changed
  const { question } = useQuestionById(
    questionId,
    sessionUser.accessToken,
    sessionUser.refreshToken
  );
  const languageSelected = languageOptions[0]; // hardcoded, to be changed
  const [docUrl, setDocUrl] = useState<AutomergeUrl>();
  const [doc, changeDoc] = useDocument<Doc>(docUrl);
  const [chatroomId, setChatroomId] = useState<string>("");
  let increment: (value: string) => void = (value: string) => {
    console.log("reflecting changes in code editor through changeDoc...");
    changeDoc((d) => (d.text = value));
  };

  useEffect(() => {
    if (sessionID) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SESSION_URL}/session/get-session/${sessionID}`
        )
        .then((res) => {
          console.log(res.data.docId);
          console.log(res.data.chatroomId);
          console.log("docId received");
          setDocUrl(res.data.docId);
          setChatroomId(res.data.chatroomId);
        })
        .catch((err) => {
          console.log(err);
          router.push("/404");
        });
    }
  }, [sessionID]);

  return (
    <div>
      {question && (
        <QuestionWorkspace
          question={question}
          doc={doc}
          increment={increment}
          initialLanguage={languageSelected}
          chatroomId={chatroomId}
        />
      )}
    </div>
  );
}
