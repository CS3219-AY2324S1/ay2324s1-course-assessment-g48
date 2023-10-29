import React, { useEffect, useState, useRef } from "react";
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

/*
WIP
*/

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
  const monacoRef = useRef<any>(null);
  const [code, changeCode] = useState(currCode ?? "");
  const [customInput, setCustomInput] = useState(""); // todo: custom input for the console...
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    languageOptions[0].label
  );

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  if (!onChangeCode) {
    onChangeCode = (value: any, event: any) => {
      changeCode(value);
    };
    // console.log("Using solo code editor. Current code:", code);
  }

  const handleCompile = () => {
    setProcessing(true);
    const language = languageOptions.find(
      (lang) => lang.label === selectedLanguage
    );
    const formData = {
      language_id: language?.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions", // process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com", // process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": "c4ba28b1c9mshc8447e97471c1e8p1a210cjsne208ca879c2a", // process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };
    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        const error = err.response ? err.response.data : err.message;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async (token: string) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions" + "/" + token, // process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com", // process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": "c4ba28b1c9mshc8447e97471c1e8p1a210cjsne208ca879c2a", // process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      const response = await axios.request(options);
      const statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === Status.InQueue || statusId === Status.Processing) {
        // in queue(id: 1) or still processing (id: 2)
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
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

  function handleEditorDidMount(editor: any, monaco: any) {
    // here is another way to get monaco instance
    // you can also store it in `useRef` for further usage
    monacoRef.current = editor;
  }

  // session live editor
  useEffect(() => {
    changeCode(currCode ?? code);
  }, [currCode]);

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
              onMount={handleEditorDidMount}
            />
          </div>
          {/* Exec Panel can still be abstracted to QuestionWorkspace -> future enhancement */}
          <ExecPanel question={question} outputDetails={outputDetails} />
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
        />
      </div>
    </>
  );
};
export default CodeEditor;
