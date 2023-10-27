import { Editor } from "@monaco-editor/react";
import { SetStateAction, useState } from "react";

type EditorWindowProps = {
  onSoloCodeChange: (
    action: string,
    data: React.SetStateAction<string>
  ) => void;
  handleEditorDidMount: (editor: any, monaco: any) => void;
  starterCode: string;
  isDarkMode: boolean;
  sessionCode: string;
};

const EditorWindow: React.FC<EditorWindowProps> = ({
  onSoloCodeChange,
  handleEditorDidMount,
  starterCode,
  isDarkMode,
  sessionCode,
}) => {
  const [value, setValue] = useState(code || "");
  const handleEditorChange = (value: SetStateAction<string>) => {
    setValue(value);
    onSoloCodeChange("code", value);
  };
  return (
    <Editor
      height="100%"
      onChange={onSoloCodeChange}
      defaultValue={starterCode}
      value={sessionCode}
      theme={isDarkMode ? "vs-dark" : "light"}
      defaultLanguage="javascript"
      onMount={handleEditorDidMount}
    />
  );
};

export default EditorWindow;
