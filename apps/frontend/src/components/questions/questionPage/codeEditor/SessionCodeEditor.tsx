import React from "react";

import CodeEditor from "./CodeEditor";
import { Language } from "@/utils/class/Language";
import { CodeType, Question } from "@/database/question/entities/question.entity";

type SessionCodeEditorProps = {
  question: Question;
  onChangeCode?: (value: string) => void;
  currSessionCode?: CodeType[];
  initialLanguage?: Language;
};

const SessionCodeEditor: React.FC<SessionCodeEditorProps> = ({
  question,
  currSessionCode,
  onChangeCode,
  initialLanguage,
}) => {
  return (
    <CodeEditor
      question={question}
      currSessionCode={currSessionCode}
      onChangeCode={onChangeCode}
      initialLanguage={initialLanguage}
      hasSession={true}
    />
  );
};
export default SessionCodeEditor;
