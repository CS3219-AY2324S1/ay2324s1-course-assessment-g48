import React, { useEffect, useState, useRef } from "react";
import EditorNav from "./EditorNav";
import ExecPanel from "../execPanel/ExecPanel";
import Split from "react-split";
import EditorFooter from "./EditorFooter";
import { useTheme } from "@/hook/ThemeContext";
import { Editor } from "@monaco-editor/react";
import { Question } from "@/database/question/entities/question.entity";
import { Language } from "@/utils/enums/Language";

type CodeEditorProps = {
  onChangeCode?: (value: any, event: any) => void;
  currCode?: string;
  question: Question;
  initialLanguage?: Language;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  onChangeCode,
  currCode,
  question,
  initialLanguage,
}) => {
  // TODO: make it dynamic
  const starterCode = `/**
* Definition for singly-linked list.
* class ListNode {
*     int val;
*     ListNode next;
*     ListNode(int x) {
*         val = x;
*         next = null;
*     }
* }
*/
class Solution {
  hasCycle(head) { 
    // Write your solution here
  }
};`;

  const { isDarkMode } = useTheme();
  const monacoRef = useRef<any>(null);

  const [code, changeCode] = useState(currCode ?? "");

  if (!onChangeCode) {
    onChangeCode = (value: any, event: any) => {
      changeCode(value);
    };
  }

  function handleEditorDidMount(editor: any, monaco: any) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = editor;
  }

  useEffect(() => {
    changeCode(currCode ?? "");
  }, [currCode]);

  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage ?? Language.javascript);

  return (
    <div className="flex flex-col h-full dark:bg-gray-800 relative overflow-hidden">
      <EditorNav
        language={selectedLanguage}
        updateLanguageInCodeEditor={setSelectedLanguage}
      />
      <Split
        className="flex-col split h-[calc(100vh-120px)]"
        direction="vertical"
        sizes={[60, 40]}
      >
        <div className="w-full overflow-auto dark:bg-neutral-800">
          <Editor
            height="100%"
            onChange={onChangeCode}
            defaultValue={starterCode}
            value={code}
            theme={isDarkMode ? "vs-dark" : "light"}
            language={selectedLanguage?.toLowerCase() ?? Language.javascript.toLowerCase()}
            onMount={handleEditorDidMount}
          />
        </div>
        {/* Exec Panel can still be abstracted to QuestionWorkspace -> future enhancement */}
        <ExecPanel question={question} />
      </Split>

      <EditorFooter />
    </div>
  );
};
export default CodeEditor;
