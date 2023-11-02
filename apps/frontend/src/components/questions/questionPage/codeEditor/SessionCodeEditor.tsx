import React from "react";

import CodeEditor from "./CodeEditor";

type SessionCodeEditorProps = {
  onChangeCode?: (value: any, event: any) => void;
  currCode?: string;
};

const SessionCodeEditor: React.FC<SessionCodeEditorProps> = ({
  currCode,
  onChangeCode,
}) => {
  return <CodeEditor currCode={currCode} onChangeCode={onChangeCode} />;
};
export default SessionCodeEditor;
