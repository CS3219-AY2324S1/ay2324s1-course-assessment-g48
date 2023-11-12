import React from "react";
import Split from "react-split";
import { Question } from "@/database/question/entities/question.entity";
import CodeEditor from "./codeEditor/CodeEditor";
import ChatWidget from "@/components/chat/ChatWidget";
import DescriptionPanel from "./codeEditor/descriptionPanel/DescriptionPanel";
import SessionCodeEditor from "./codeEditor/SessionCodeEditor";
import { Language } from "@/utils/class/Language";
import { Doc } from "@automerge/automerge/next";

type QuestionWorkspaceProps = {
  question: Question;
  doc?: Doc<any>;
  initialLanguage?: Language;
  increment?: (value: string) => void;
  chatroomId?: string;
};

const QuestionWorkspace: React.FC<QuestionWorkspaceProps> = ({
  question,
  doc,
  initialLanguage,
  increment,
  chatroomId,
}) => {
  console.log({
    question,
    doc,
    initialLanguage,
    increment,
    chatroomId,
  });
  return (
    <>
      <Split className="split flex-1 h-[calc(100vh-60px)]">
        <DescriptionPanel question={question} />
        <div>
          {doc ? (
            <SessionCodeEditor
              question={question}
              currSessionCode={[
                {
                  languageId: initialLanguage!.id,
                  code: doc?.text ?? "",
                },
              ]}
              onChangeCode={increment}
              initialLanguage={initialLanguage}
            />
          ) : (
            <CodeEditor question={question} />
          )}
        </div>
      </Split>
      {doc && <ChatWidget chatroomId={chatroomId} />}
    </>
  );
};
export default QuestionWorkspace;
