import { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { useRouter } from "next/router";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { next as A, change } from "@automerge/automerge";
import { Doc } from "@/utils/doc";
import axios from "../api/axios/axios";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { editor } from "monaco-editor";

export default function Session() {
  const sessionID = useRouter().query.sessionId as string;

  const [docUrl, setDocUrl] = useState<AutomergeUrl>();

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SESSION_URL}/session/get-session/${sessionID}`
      )
      .then((res) => {
        console.log(res.data.docId);
        setDocUrl(res.data.docId);
        return;
      });
  }, []);

  const [doc, changeDoc] = useDocument<Doc>(docUrl);

  const increment = (value: any, event: any) => {
    changeDoc((d) => (d.text = value));
  };

  const changeText: ChangeEventHandler<HTMLInputElement> = (event) => {
    changeDoc((d) => (d.text = event.target.value));
  };

  return (
    <div>
      <Editor
        height="90vh"
        onChange={increment}
        value={doc?.text}
        defaultLanguage="javascript"
      />
    </div>
  );
}
