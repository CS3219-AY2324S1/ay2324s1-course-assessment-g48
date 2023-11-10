import React, { useEffect, useMemo, useState } from "react";
import EditorNav from "./EditorNav";
import Split from "react-split";
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
import ExecPanel from "./execPanel/ExecPanel";
import EditorFooter from "./execPanel/editorFooter/EditorFooter";
import useSessionUser from "@/hook/useSessionUser";
import { useRouter } from "next/router";
import { HistoryQuestionTestcase } from "@/database/history/entities/history.entity";
import { postNewHistory } from "@/database/history/historyService";

type CodeEditorProps = {
  onChangeCode?: (value: string | undefined) => void;
  currSessionCode?: CodeType[];
  question: Question;
  initialLanguage?: Language;
  hasSession?: boolean;
  users: number[]
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  onChangeCode,
  currSessionCode,
  question,
  initialLanguage,
  hasSession,
  users
}) => {
  const { isDarkMode } = useTheme();
  const sessionID = useRouter().query?.sessionId as string;
  const defaultLanguage : Language|undefined = languageOptions.find((lang) => lang.id === 71)
  // current language selected by user
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    initialLanguage ?? defaultLanguage!
  ); // "python language"
  // default code for the language selected by user
  const starterCode = useMemo(
    () =>
      question.starterCode.find(
        (starterCode) => starterCode.languageId === selectedLanguage.id
      )?.code ?? "",
    [question.starterCode, selectedLanguage.id]
  );
  // current code on editor shown to user, formatted as string
  const [displayCode, setDisplayCode] = useState<string>(
    currSessionCode?.[0]?.code ?? starterCode
  );
  // keep track of the current codes for each language using an array of CodeType
  const [codeArray, setCodeArray] = useState<CodeType[]>(
    currSessionCode ?? [{ languageId: selectedLanguage.id, code: displayCode }]
  );
  const [outputDetails, setOutputDetails] = useState(
    new Array(question.testcases.length)
  );
  const [processing, setProcessing] = useState(false);
  const {sessionUser} = useSessionUser();
  const [historyTestCase, setHistoryTestCase] = useState<HistoryQuestionTestcase[]>([{
    runTime: 0,
    outcome: 0,
  }]);

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

  const handleOutputDetails = (response: any, index: number) => {
    setOutputDetails((prev) => {
      const newOutputDetails = [...prev];
      newOutputDetails[index] = response;
      return newOutputDetails;
    });
  };

  // const findLanguage = (language: Language) => {
  //   return languageOptions.find((lang) => lang.label === language.label);
  // };

  const handleCompile = async () => {
    setProcessing(true);
    // const language = findLanguage(selectedLanguage);
    const language = selectedLanguage;

    question.testcases.forEach((testCase) => {
      console.log("testcase", testCase);
      console.log("testcase base64 Input is:", btoa(testCase.input));
      console.log("testcase ExpectedOutput is:", btoa(testCase.output));
      console.log("testcase base64 ExpectedOutput is:", btoa(testCase.output));
    });
    const submissions = question.testcases.map((testCase) => ({
      language_id: language.id,
      source_code: btoa(displayCode),
      stdin: btoa(testCase.input),
      expected_output: btoa(testCase.output),
    }));
    const body = {
      submissions: submissions,
    };

    try {
      const response = await axios.post("/api/codeExecution/compile", body);
      const tokens = response.data; // tokens becomes an array instead of objects
      let allSuccess = true;
      for (let i = 0; i < tokens.length; i++) {
        const success: boolean | undefined = await checkStatus(
          tokens[i].token,
          i
        );
        console.log("success", success);
        if (!success) {
          allSuccess = false;
        }
      }
      if (allSuccess) {
        showSuccessToast(`Compiled Successfully!`);
        
      } else {
        showErrorToast("A testcase failed, please try again!");
      }
  
    console.log("asdasdasdad", outputDetails);

    const newCompletedQuestion = {
      questionId: question._id,
      questionTitle: question.title,
      language: selectedLanguage.label,
      answer: btoa(displayCode),
      testcases: historyTestCase,
      completedAt: new Date(),
      result: allSuccess ? "Correct" : "Incorrect",
    }
    const newHistory = {
      userIds: users,
      sessionId: sessionID??String(users[0]),
      completed: [newCompletedQuestion],
      date: new Date(),
      _id: ""
    }

    await postNewHistory(newHistory, sessionUser.accessToken??undefined, sessionUser.refreshToken??undefined).then((data) => {
      console.log("success", data);
    }).catch((err) => {
      console.log("error", err);
    })
    } catch (err) {
      setProcessing(false);
      console.log(err);
    }
  };

  const checkStatus = (token: string, index: number) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const response = await axios.get(`/api/codeExecution/status/${token}`);
        const statusId = response.data.status_id;
        console.log(
          "response.data outputdetails in checkStatus",
          response.data
        );
        // Processed - we have a result
        if (statusId === Status.InQueue || statusId === Status.Processing) {
          // in queue(id: 1) or still processing (id: 2)
          setTimeout(() => {
            resolve(checkStatus(token, index));
          }, 2000);
        } else {
          setProcessing(false);
          handleOutputDetails(response.data, index);
          console.log("response.data", response.data.id);
          setHistoryTestCase((prev) => [
            ...prev,{
              runTime: response.data.time,
              outcome: response.data.status.id,
            }]
          )
          if (statusId === Status.Accepted) {
            resolve(true);
          } else {
            resolve(false);
        }
      }
      } catch (err) {
        setProcessing(false);
        showErrorToast((err as Error).message);
        resolve(false);
      }
    });
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
