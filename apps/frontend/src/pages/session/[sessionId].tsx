import { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useRouter } from "next/router";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { Doc } from "@/utils/doc";
import axios from "../api/axios/axios";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { useTheme } from "@/hook/ThemeContext";
import SessionCodeEditor from "@/components/questions/questionPage/codeEditor/SessionCodeEditor";
import SessionQuestionWorkspace from "@/components/questions/questionPage/SessionQuestionWorkspace";
import useQuestionById from "@/hook/useQuestionById";

export default function Session() {
  const sessionID = useRouter().query.sessionId as string;
  const questionId = "6509aea00cbd6c2179ad44d2";
  const { question, isLoading, error } = useQuestionById(questionId);

  return (
    <div>
      {question && (
        <SessionQuestionWorkspace question={question} sessionId={sessionID} />
      )}
    </div>
  );
}
