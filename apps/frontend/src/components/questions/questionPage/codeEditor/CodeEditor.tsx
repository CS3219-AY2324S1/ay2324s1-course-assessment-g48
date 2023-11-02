import React, { useEffect, useMemo, useState } from "react";
import EditorNav from "./EditorNav";
import ExecPanel from "../execPanel/ExecPanel";
import Split from "react-split";
import EditorFooter from "./editorFooter/EditorFooter";
import { useTheme } from "@/hook/ThemeContext";
import { Editor } from "@monaco-editor/react";
import { Question } from "@/database/question/entities/question.entity";
import axios from "axios";
import { languageOptions } from "@/utils/constants/LanguageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "@/hook/useKeyPress";
import monaco from "monaco-editor";
import { Language } from "@/utils/class/Language";
import { Status } from "@/utils/enums/Status";

type CodeEditorProps = {
  onChangeCode?: (
    value?: string,
    event?: monaco.editor.IModelContentChangedEvent
  ) => void;
  currCode?: string;
  question: Question;
  initialLanguage?: Language;
  hasSession?: boolean;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  onChangeCode,
  currCode,
  question,
  initialLanguage,
  hasSession,
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

  // WIP formatStarterCode(starterCode, selectedLanguage)
  function formatStarterCode(starterCode: string, language: string) {
    const lang = findLanguage(language);
  }

  function findLanguage(language: string) {
    return languageOptions.find((lang) => lang.label === language);
  }

  const { isDarkMode } = useTheme();
  const [code, changeCode] = useState(currCode ?? "");
  const [customInput, setCustomInput] = useState(""); // todo: for console
  const [outputDetails, setOutputDetails] = useState("");
  const [processing, setProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    initialLanguage ?? languageOptions[0]
  ); // "javascript language"

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const memoizedOutputDetails = useMemo(() => outputDetails, [outputDetails]);

  if (!onChangeCode) {
    onChangeCode = (value?: string) => {
      changeCode(value ?? "");
    };
    // console.log("Using solo code editor. Current code:", code);
  }

  const handleCompile = async () => {
    setProcessing(true);
    console.log("tc output", question.testcases[0].output);
    const formData = {
      language_id: selectedLanguage?.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
      expected_output: btoa(question.testcases[0].output), // hardcoded tc
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
          "response.data output details in checkStatus",
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
    <div className="flex flex-col h-full dark:bg-gray-800 relative overflow-hidden">
      <EditorNav
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        hasSession={hasSession!}
      />
      <Split
        className="flex-col split h-[calc(100vh-120px)] w-full"
        direction="vertical"
        sizes={[60, 40]}
      >
        <div className="w-full overflow-auto dark:bg-neutral-800">
          <Editor
            onChange={onChangeCode}
            defaultValue={starterCode}
            value={code}
            theme={isDarkMode ? "vs-dark" : "light"}
            language={selectedLanguage.value.toLowerCase()}
          />
        </div>
        {/* Exec Panel can still be abstracted to QuestionWorkspace -> future enhancement */}
        <ExecPanel question={question} outputDetails={memoizedOutputDetails} />
      </Split>
      {/* Gotta check whether toastcontainer actually works... */}
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
  );
};

CodeEditor.defaultProps = {
  hasSession: false,
};

export default CodeEditor;
