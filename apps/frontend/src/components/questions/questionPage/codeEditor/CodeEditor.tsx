import React, { useEffect, useState } from "react";
import EditorNav from "./EditorNav";
import Split from "react-split";
import TestCasesHeader from "./TestCasesHeader";
import TestCaseChip from "./TestCaseChip";
import InputOutput from "./InputOutput";
import EditorFooter from "./EditorFooter";
import { useTheme } from "@/hook/ThemeContext";
import { Editor } from "@monaco-editor/react";
import { useRouter } from "next/router";
import { AutomergeUrl } from "@automerge/automerge-repo";
import axios from "@/pages/api/axios/axios";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Doc } from "@/utils/doc";

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
class Solution {
  hasCycle(head) { 
    // Write your solution here
  }
};`;

  const { isDarkMode } = useTheme();

  // TODO: Get sessionID here somehow? Not sure if this works
  const sessionID = useRouter().query.sessionId as string;

  const [docUrl, setDocUrl] = useState<AutomergeUrl>();

  useEffect(() => {
    if (sessionID) {
      axios.get(
        `${process.env.NEXT_PUBLIC_SESSION_URL}/session/get-session/${sessionID}`
      )
      .then((res) => {
        console.log(res.data.docId);
        setDocUrl(res.data.docId);
      })
    }
  }, [sessionID]);

  const [doc, changeDoc] = useDocument<Doc>(docUrl);

  const increment = (value: any, event: any) => {
    changeDoc((d) => (d.text = value));
  };

  return (
    <div className="flex flex-col dark:bg-gray-800 relative overflow-x-hidden">
      <EditorNav />
      <Split
        className="flex-col split h-screen"
        direction="vertical"
        sizes={[60, 40]}
      >
        <div className="w-full overflow-auto dark:bg-neutral-800">
          <Editor
            height="100%"
            onChange={increment}
            defaultValue={starterCode}
            value={doc?.text}
            theme={isDarkMode ? "vs-dark" : "light"}
            defaultLanguage="javascript"
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
