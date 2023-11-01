import React from "react";
import Split from "react-split";
import DescriptionPanel from "./descriptionPanel/DescriptionPanel";
import { Question } from "@/database/question/entities/question.entity";
import CodeEditor from "./codeEditor/CodeEditor";
import ChatWidget from "@/components/chat/ChatWidget";
import SessionCodeEditor from "./codeEditor/SessionCodeEditor";
import { Language } from "@/utils/class/Language";

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
  return (
    <>
      <Split className="split flex-1 h-[calc(100vh-60px)]">
        <DescriptionPanel question={question} />
        {sessionId ? (
          <SessionCodeEditor
            question={question}
            sessionId={sessionId}
            initialLanguage={initialLanguage!}
          />
        ) : (
          <CodeEditor question={question} />
        )}
      </Split>
      <ChatWidget sessionId={sessionId}/>
    </>
  );
};
export default QuestionWorkspace;
