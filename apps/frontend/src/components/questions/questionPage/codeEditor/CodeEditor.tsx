import React, { useEffect, useState, useRef } from "react";
import EditorNav from "./EditorNav";
import Split from "react-split";
import TestCasesHeader from "./TestCasesHeader";
import TestCaseChip from "./TestCaseChip";
import InputOutput from "./InputOutput";
import EditorFooter from "./EditorFooter";
import { useTheme } from "@/hook/ThemeContext";
import { Editor } from "@monaco-editor/react";


type CodeEditorProps = {
  onChangeCode?: (value: any, event: any) => void;
  currCode?: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ onChangeCode, currCode }) => {
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

  function handleEditorDidMount(editor:any, monaco:any) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = editor;
  }


  useEffect(() => {
    changeCode(currCode ?? "");
  }, [currCode]);

  return (
    <div className="flex flex-col h-full dark:bg-gray-800 relative overflow-hidden">
      <EditorNav />
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
            defaultLanguage="javascript"
            onMount={handleEditorDidMount}
          />
        </div>

        <div className="w-full px-5 overflow-auto dark:bg-neutral-800">
          <TestCasesHeader />
          <div className="flex">
            <TestCaseChip testNum={1} />
            <TestCaseChip testNum={2} />
            <TestCaseChip testNum={3} />
          </div>

          <InputOutput inputText="[3,2,0,-4]" outputText="1" />
        </div>
      </Split>

      <EditorFooter />
    </div>
  );
};
export default CodeEditor;
