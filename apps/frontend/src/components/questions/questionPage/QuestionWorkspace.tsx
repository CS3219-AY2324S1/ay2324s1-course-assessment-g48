import React from "react";
import Split from "react-split";
import DescriptionPanel from "./DescriptionPanel";
import { Question } from "@/database/question/entities/question.entity";
import CodeEditor from "./codeEditor/CodeEditor";

type QuestionWorkspaceProps = {
  question: Question;
};

const QuestionWorkspace: React.FC<QuestionWorkspaceProps> = ({ question }) => {
  return (
    <Split className="split flex-1">
      <DescriptionPanel question={question} />
      <CodeEditor />
    </Split>
  );
};
export default QuestionWorkspace;
