import React, { useEffect, useMemo, useState } from "react";
import EditorNav from "./EditorNav";
import ExecPanel from "../execPanel/ExecPanel";
import Split from "react-split";
import EditorFooter from "./editorFooter/EditorFooter";
import { useTheme } from "@/hook/ThemeContext";
import { Editor } from "@monaco-editor/react";
import {
  CodeType,
  Question,
} from "@/database/question/entities/question.entity";
import axios from "axios";
import { languageOptions } from "@/utils/constants/LanguageOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useKeyPress from "@/hook/useKeyPress";
import { Language } from "@/utils/class/Language";
import { Status } from "@/utils/enums/Status";

type CodeEditorProps = {
  onChangeCode?: (
    value: string,
  ) => void;
  currSessionCode?: CodeType[];
  question: Question;
  initialLanguage?: Language;
  hasSession?: boolean;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  onChangeCode,
  currSessionCode,
  question,
  initialLanguage,
  hasSession,
}) => {

  const { isDarkMode } = useTheme();
  // current language selected by user
  const [selectedLanguage, setSelectedLanguage] = useState(
    initialLanguage ?? languageOptions[0]
  ); // "javascript language"
  // default code for the language selected by user
  const starterCode = useMemo(() => question.starterCode.find(
      (starterCode) => starterCode.languageId === selectedLanguage.id
    )?.code ?? "", [question.starterCode, selectedLanguage.id]);
  // current code on editor shown to user, formatted as string
  const [displayCode, setDisplayCode] = useState<string>(
    currSessionCode?.[0]?.code ?? starterCode
  );
  // keep track of the current codes for each language using an array of CodeType
  const [codeArray, setCodeArray] = useState<CodeType[]>(
    currSessionCode ?? [{ languageId: selectedLanguage.id, code: displayCode }]
  );
  const [customInput, setCustomInput] = useState(""); // todo: for console
  const [outputDetails, setOutputDetails] = useState("");
  const [processing, setProcessing] = useState(false);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  const memoizedOutputDetails = useMemo(() => outputDetails, [outputDetails]);

  if (!onChangeCode) {
    onChangeCode = (value?: string) => {
      // find the corresponding language code in codeArray
      const index = codeArray.findIndex(
        (langCode) => langCode.languageId === selectedLanguage.id
      );
      if (index === -1) {
        // take from starter code if not found, add to existing codeArray
        console.log(`selectedLanguage ${selectedLanguage.id} not found.`);
        setCodeArray([
          ...codeArray,
          {
            languageId: selectedLanguage.id,
            code:
              question.starterCode.find(
                (starterCode) => starterCode.languageId === selectedLanguage.id
              )?.code ?? "",
          },
        ]);
      } else {
        // else just update code in codeArray
        const updatedCodeArray = [...codeArray];
        updatedCodeArray[index].code = value ?? "";
        setCodeArray(updatedCodeArray);
      }
      // change display code as per normal
      setDisplayCode(value ?? "");
    };
    // console.log("Using solo code editor. Current code:", code);
  }

  const handleCompile = async () => {
    setProcessing(true);
    console.log("tc output", question.testcases[0].output);
    const formData = {
      language_id: selectedLanguage?.id,
      // encode source code in base64
      source_code: btoa(displayCode),
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
    setCodeArray(currSessionCode ?? codeArray);
    setDisplayCode(currSessionCode?.[0]?.code ?? displayCode);
  }, [currSessionCode, codeArray, displayCode]);

  useEffect(() => {
    // switch display code when language is changed
    // if user has not typed anything, switch to starter code
    // if starter code is undefined, switch to empty string
    setDisplayCode(
      codeArray.find((langCode) => langCode.languageId == selectedLanguage.id)
        ?.code ??
        question.starterCode.find(
          (starterCode) => starterCode.languageId === selectedLanguage.id
        )?.code ??
        ""
    );
  }, [codeArray, displayCode, selectedLanguage, question.starterCode]);

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
            value={displayCode}
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
        userCode={displayCode}
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
