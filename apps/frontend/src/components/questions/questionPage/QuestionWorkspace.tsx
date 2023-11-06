import React from "react";
import Split from "react-split";
import { Question } from "@/database/question/entities/question.entity";
import CodeEditor from "./codeEditor/CodeEditor";
import ChatWidget from "@/components/chat/ChatWidget";
import DescriptionPanel from "./codeEditor/descriptionPanel/DescriptionPanel";

type QuestionWorkspaceProps = {
  question: Question;
};

const QuestionWorkspace: React.FC<QuestionWorkspaceProps> = ({ question }) => {
  return (
    <>
      <Split className="split flex-1">
        <DescriptionPanel question={question} />
        <CodeEditor question={question} />
      </Split>
      <ChatWidget />
    </>
  );
};
export default QuestionWorkspace;
