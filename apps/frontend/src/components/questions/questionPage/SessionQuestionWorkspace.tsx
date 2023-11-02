import React, { useEffect, useState } from "react";
import Split from "react-split";
import DescriptionPanel from "./DescriptionPanel";
import { Question } from "@/database/question/entities/question.entity";
import SessionCodeEditor from "./codeEditor/SessionCodeEditor";
import ChatWidget from "@/components/chat/ChatWidget";
import { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import axios from "axios";
import { useRouter } from "next/router";
import { Doc } from "@/utils/doc";

type SessionQuestionWorkspaceProps = {
  question: Question;
  sessionId: string;
};

const SessionQuestionWorkspace: React.FC<SessionQuestionWorkspaceProps> = ({
  question,
  sessionId,
}) => {
  const sessionID = sessionId as string;
  const router = useRouter();

  const [docUrl, setDocUrl] = useState<AutomergeUrl>();
  const [doc, changeDoc] = useDocument<Doc>(docUrl);
  const [chatroomId, setChatroomId] = useState<string>("");

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

  const increment = (value: any, event: any) => {
    console.log("reflecting changes in code editor through changeDoc...");
    changeDoc((d) => (d.text = value));
  };

  return (
    <>
      <Split className="split flex-1">
        <DescriptionPanel question={question} />
        <SessionCodeEditor currCode={doc?.text} onChangeCode={increment} />
      </Split>
      <ChatWidget chatroomId={chatroomId} />
    </>
  );
};
export default SessionQuestionWorkspace;
