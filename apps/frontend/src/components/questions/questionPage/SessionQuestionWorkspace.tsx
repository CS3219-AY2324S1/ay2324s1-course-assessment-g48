import React from "react";
import Split from "react-split";
import DescriptionPanel from "./DescriptionPanel";
import { Question } from "@/database/question/entities/question.entity";
import CodeEditor from "./codeEditor/CodeEditor";
import SessionCodeEditor from "./codeEditor/SessionCodeEditor";

type SessionQuestionWorkspaceProps = {
  question: Question;
  sessionId: string;
};

const SessionQuestionWorkspace: React.FC<SessionQuestionWorkspaceProps> = ({
  question,
  sessionId,
}) => {
  return (
    <Split className="split flex-1">
      <DescriptionPanel question={question} />
      <SessionCodeEditor sessionId={sessionId} />
    </Split>
  );
};
export default SessionQuestionWorkspace;
