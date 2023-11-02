import React, { useEffect, useMemo, useState } from "react";
import EditorNav from "./EditorNav";
import ExecPanel from "../execPanel/ExecPanel";
import Split from "react-split";
import EditorFooter from "../execPanel/editorFooter/EditorFooter";
import { useTheme } from "@/hook/ThemeContext";
import { Editor } from "@monaco-editor/react";
import { Question } from "@/database/question/entities/question.entity";
import axios from "axios";
import { languageOptions } from "@/utils/constants/LanguageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "@/hook/useKeyPress";
import monaco from "monaco-editor";
import { Status } from "@/utils/enums/Status";

type CodeEditorProps = {
  onChangeCode?: (
    value?: string,
    event?: monaco.editor.IModelContentChangedEvent
  ) => void;
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
  const [customInput, setCustomInput] = useState(""); // todo: for console
  const [outputDetails, setOutputDetails] = useState("");
  const [processing, setProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    languageOptions[0].label // "javascript language"
  );
  const [selectedTestCaseChip, setSelectedTestCaseChip] = useState<number>(1);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const memoizedOutputDetails = useMemo(() => outputDetails, [outputDetails]);

  if (!onChangeCode) {
    onChangeCode = (value?: string) => {
      changeCode(value ?? "");
    };
    // console.log("Using solo code editor. Current code:", code);
  }

  const handleTestCaseChipClick = (testNum: number) => {
    setSelectedTestCaseChip(testNum);
  };

  function findLangugage(language: string) {
    return languageOptions.find((lang) => lang.label === language);
  }

  const handleCompile = async () => {
    setProcessing(true);
    const language = findLangugage(selectedLanguage);
    const formData = {
      language_id: language?.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
      expected_output: btoa(
        question.testcases[selectedTestCaseChip - 1].output
      ),
    };
    try {
      const response = await axios.post("/api/codeExecution/compile", formData);
      const token = response.data.token;
      checkStatus(token);
    } catch (err) {
      setProcessing(false);
      console.log(err);
    }
  };

  const checkStatus = async (token: string) => {
    try {
      const response = await axios.get(`/api/codeExecution/status/${token}`);
      const statusId = response.data.status_id;
      // Processed - we have a result
      if (statusId === Status.InQueue || statusId === Status.Processing) {
        // in queue(id: 1) or still processing (id: 2)
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        console.log(
          "response.data outputdetails in checkStatus",
          response.data
        );
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      setProcessing(false);
      showErrorToast((err as Error).message);
    }
  };

  const showSuccessToast = (msg: string) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg: string) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // session live editor
  useEffect(() => {
    changeCode(currCode ?? code);
  }, [currCode, code]);

  // ctrl + enter => run
  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  return (
    <>
      <div className="flex flex-col h-full dark:bg-gray-800 relative overflow-hidden">
        <EditorNav
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
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
              defaultLanguage="javascript"
            />
          </div>
          <ExecPanel
            question={question}
            outputDetails={memoizedOutputDetails}
            selectedTestCaseChip={selectedTestCaseChip}
            handleTestCaseChipClick={handleTestCaseChipClick}
          />
        </Split>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <EditorFooter
          userCode={code}
          processing={processing}
          handleCompile={handleCompile}
          question={question}
        />
      </div>
    </>
  );
};
export default CodeEditor;
