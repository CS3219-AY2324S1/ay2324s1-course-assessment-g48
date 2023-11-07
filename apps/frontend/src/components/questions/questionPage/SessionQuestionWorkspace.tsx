import React from "react";
import Split from "react-split";
import DescriptionPanel from "./codeEditor/descriptionPanel/DescriptionPanel";
import { Question } from "@/database/question/entities/question.entity";
import SessionCodeEditor from "./codeEditor/SessionCodeEditor";
import ChatWidget from "@/components/chat/ChatWidget";

type SessionQuestionWorkspaceProps = {
  question: Question;
  sessionId: string;
};

const SessionQuestionWorkspace: React.FC<SessionQuestionWorkspaceProps> = ({
  question,
  sessionId,
}) => {
  return (
    <>
      <Split className="split flex-1">
        <DescriptionPanel question={question} />
        <SessionCodeEditor question={question}/>
      </Split>
      <ChatWidget />
    </>
  );
};
export default SessionQuestionWorkspace;
