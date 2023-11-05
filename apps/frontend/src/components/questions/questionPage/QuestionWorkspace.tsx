import React, { useEffect, useState } from "react";
import Split from "react-split";
import DescriptionPanel from "./descriptionPanel/DescriptionPanel";
import { Question } from "@/database/question/entities/question.entity";
import CodeEditor from "./codeEditor/CodeEditor";
import ChatWidget from "@/components/chat/ChatWidget";
import SessionCodeEditor from "./codeEditor/SessionCodeEditor";
import { Language } from "@/utils/class/Language";
import { useRouter } from "next/router";
import { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Doc } from "@automerge/automerge/next";
import axios from "axios";

type QuestionWorkspaceProps = {
  question: Question;
  sessionId?: string;
  initialLanguage?: Language;
};

const QuestionWorkspace: React.FC<QuestionWorkspaceProps> = ({
  question,
  sessionId,
  initialLanguage,
}) => {
  const sessionID = sessionId as string;
  const router = useRouter();

  const [docUrl, setDocUrl] = useState<AutomergeUrl>();
  const [doc, changeDoc] = useDocument<Doc>(docUrl);
  const [chatroomId, setChatroomId] = useState<string>("");
  let increment: (value: string) => void;

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

  if (sessionId) {
    increment = (value: string) => {
      console.log("reflecting changes in code editor through changeDoc...");
      changeDoc((d) => (d.text = value));
    };
  }
  return (
    <>
      <Split className="split flex-1 h-[calc(100vh-60px)]">
        <DescriptionPanel question={question} />
        {sessionId ? (
          <SessionCodeEditor
            question={question}
            currSessionCode={[
              {
                languageId: initialLanguage!.id,
                code: doc?.text ?? "",
              },
            ]}
            onChangeCode={increment!}
            initialLanguage={initialLanguage}
          />
        ) : (
          <CodeEditor question={question} />
        )}
      </Split>
      {sessionId && <ChatWidget /> }
    </>
  );
};
export default QuestionWorkspace;
