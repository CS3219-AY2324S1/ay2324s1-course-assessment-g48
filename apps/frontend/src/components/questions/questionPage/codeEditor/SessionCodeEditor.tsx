import React, { useEffect, useState } from "react";
import { AutomergeUrl } from "@automerge/automerge-repo";
import axios from "@/pages/api/axios/axios";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Doc } from "@/utils/doc";
import CodeEditor from "./CodeEditor";

type SessionCodeEditorProps = {
  sessionId: string;
};

const SessionCodeEditor: React.FC<SessionCodeEditorProps> = ({ sessionId }) => {
  // TODO: Get sessionID here somehow? Not sure if this works
  const sessionID = sessionId as string;

  const [docUrl, setDocUrl] = useState<AutomergeUrl>();

  useEffect(() => {
    if (sessionID) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SESSION_URL}/session/get-session/${sessionID}`
        )
        .then((res) => {
          console.log(res.data.docId);
          setDocUrl(res.data.docId);
        });
    }
  }, [sessionID]);

  const [doc, changeDoc] = useDocument<Doc>(docUrl);

  const increment = (value: any, event: any) => {
    changeDoc((d) => (d.text = value));
  };

  return <CodeEditor currCode={doc?.text} onChangeCode={increment} />;
};
export default SessionCodeEditor;
