import React, { useEffect, useState } from "react";
import EditorNav from "./EditorNav";
import Split from "react-split";
import TestCasesHeader from "./TestCasesHeader";
import TestCaseChip from "./TestCaseChip";
import InputOutput from "./InputOutput";
import EditorFooter from "./EditorFooter";
import { useTheme } from "@/hook/ThemeContext";
import { Editor } from "@monaco-editor/react";
import { Question } from "@/database/question/entities/question.entity";

type CodeEditorProps = {
  onChangeCode?: (value: any, event: any) => void;
  currCode?: string;
  question: Question;
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

  const [code, changeCode] = useState(currCode ?? "");
  const [selectedTestCase, setSelectedTestCase] = useState<number | null>(1);

  const handleTestCaseClick = (testNum: number) => {
    setSelectedTestCase(testNum);
  };

  if (!onChangeCode) {
    onChangeCode = (value: any, event: any) => {
      changeCode(value);
    };
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
          />
        </div>

        <div className="w-full px-5 overflow-auto dark:bg-neutral-800">
          <TestCasesHeader />
          <div className="flex">
            {question.testcases.map((testcase) => (
              <TestCaseChip
                key={testcase.number}
                testNum={testcase.number}
                onClick={() => handleTestCaseClick(testcase.number)}
              />
            ))}
          </div>

          {selectedTestCase !== null && (
            <InputOutput
              inputText={question.testcases[selectedTestCase - 1].input}
              outputText={question.testcases[selectedTestCase - 1].output}
            />
          )}
        </div>
      </Split>

      <EditorFooter />
    </div>
  );
};
export default CodeEditor;
