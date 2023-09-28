import React from "react";
import EditorNav from "./EditorNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import TestCasesHeader from "./TestCasesHeader";
import TestCaseChip from "./TestCaseChip";
import InputOutput from "./InputOutput";
import EditorFooter from "./EditorFooter";

type CodeEditorProps = {};

const CodeEditor: React.FC<CodeEditorProps> = () => {
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
public class Solution {
  public boolean hasCycle(ListNode head) { 
    // Write your solution here
  }
};`;

  return (
    <div className="flex flex-col dark:bg-gray-800 relative overflow-x-hidden">
      <EditorNav />
      <Split
        className="flex-col split h-screen"
        direction="vertical"
        sizes={[60, 40]}
      >
        <div className="w-full overflow-auto dark:bg-neutral-800">
          <CodeMirror
            value={starterCode}
            height="100%"
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 14 }}
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
