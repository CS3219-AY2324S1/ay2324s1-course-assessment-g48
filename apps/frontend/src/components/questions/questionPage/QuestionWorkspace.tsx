import React, { useEffect } from "react";
import Split from "react-split";
import { Question } from "@/database/question/entities/question.entity";
import CodeEditor from "./codeEditor/CodeEditor";
import ChatWidget from "@/components/chat/ChatWidget";
import DescriptionPanel from "./codeEditor/descriptionPanel/DescriptionPanel";
import SessionCodeEditor from "./codeEditor/SessionCodeEditor";
import { Language } from "@/utils/class/Language";
import { Doc } from "@automerge/automerge/next";
import useSessionUser from "@/hook/useSessionUser";

type QuestionWorkspaceProps = {
  question: Question;
  doc?: Doc<any>;
  initialLanguage?: Language;
  increment?: (value: string) => void;
  chatroomId?: string;
  users?: number[];
};

const QuestionWorkspace: React.FC<QuestionWorkspaceProps> = ({
  question,
  doc,
  initialLanguage,
  increment,
  chatroomId,
  users
}) => {
  const {sessionUser} = useSessionUser();
  console.log(doc)
  return (
    <>
      <Split className="split flex-1 h-[calc(100vh-60px)]">
        <DescriptionPanel question={question} />
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
            users={users!}
          />
        ) : (
          <CodeEditor question={question} users={[sessionUser.id]} />
        )}
      </Split>
      {doc && <ChatWidget chatroomId={chatroomId} />}
    </>
  );
};
export default QuestionWorkspace;
