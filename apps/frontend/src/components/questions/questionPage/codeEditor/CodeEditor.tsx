import React, { useEffect, useState, useRef } from "react";
import EditorNav from "./EditorNav";
import Split from "react-split";
import TestCaseHeader from "./TestCaseHeader";
import EditorFooter from "./EditorFooter";
import { useTheme } from "@/hook/ThemeContext";
import { Editor } from "@monaco-editor/react";
import { Question } from "@/database/question/entities/question.entity";
import TestCaseContent from "./TestCaseContent";
import ResultContent from "./ResultContent";

type CodeEditorProps = {
  onChangeCode?: (value: any, event: any) => void;
  currCode?: string;
  question?: Question;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  onChangeCode,
  currCode,
  question,
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
  const [isResultActive, setIsResultActive] = useState(false);
  const [selectedTestCaseChip, setSelectedTestCaseChip] = useState<
    number | null
  >(1);

  const handleResultClick = () => {
    setIsResultActive(true);
  };

  const handleTestCaseClick = () => {
    setIsResultActive(false);
  };

  const handleTestCaseChipClick = (testNum: number) => {
    setSelectedTestCaseChip(testNum);
  };

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
            value={code}
            theme={isDarkMode ? "vs-dark" : "light"}
            defaultLanguage="javascript"
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="w-full px-5 overflow-auto dark:bg-neutral-800">
          <TestCaseHeader
            handleResultClick={handleResultClick}
            handleTestCaseClick={handleTestCaseClick}
            isResultActive={isResultActive}
          />

          {!isResultActive ? (
            <TestCaseContent
              question={question}
              handleTestCaseChipClick={handleTestCaseChipClick}
              selectedTestCaseChip={selectedTestCaseChip}
            />
          ) : (
            <ResultContent />
          )}
        </div>
      </Split>

      <EditorFooter />
    </div>
  );
};
export default CodeEditor;
