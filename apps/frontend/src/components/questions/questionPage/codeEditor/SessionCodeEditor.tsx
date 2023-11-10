import React from "react";

import CodeEditor from "./CodeEditor";
import { Language } from "@/utils/class/Language";
import { CodeType, Question } from "@/database/question/entities/question.entity";

type SessionCodeEditorProps = {
  question: Question;
  onChangeCode?: (value: string) => void;
  currSessionCode?: CodeType[];
  initialLanguage?: Language;
  users: number[];
};

const SessionCodeEditor: React.FC<SessionCodeEditorProps> = ({
  question,
  currSessionCode,
  onChangeCode,
  initialLanguage,
  users
}) => {
  return (
    <CodeEditor
      question={question}
      currSessionCode={currSessionCode}
      onChangeCode={(value: string | undefined) => onChangeCode?.(value ?? '')}
      initialLanguage={initialLanguage}
      hasSession={true}
      users={users}
    />
  );
};
export default SessionCodeEditor;
