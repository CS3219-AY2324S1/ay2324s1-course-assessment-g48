import React from "react";
import Split from "react-split";
import DescriptionPanel from "./descriptionPanel/DescriptionPanel";
import { Question } from "@/database/question/entities/question.entity";
import CodeEditor from "./codeEditor/CodeEditor";
import ChatWidget from "@/components/chat/ChatWidget";

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
