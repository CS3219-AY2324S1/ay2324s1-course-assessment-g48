import React, { useEffect, useState } from "react";
import { AutomergeUrl } from "@automerge/automerge-repo";
import axios from "@/pages/api/axios/axios";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Doc } from "@/utils/doc";
import CodeEditor from "./CodeEditor";
import { useRouter } from "next/router";
import { Question } from "@/database/question/entities/question.entity";

type SessionCodeEditorProps = {
  sessionId: string;
  question: Question;
};

const SessionCodeEditor: React.FC<SessionCodeEditorProps> = ({
  sessionId,
  question,
}) => {
  // TODO: Get sessionID here somehow? Not sure if this works
  const sessionID = sessionId as string;
  const router = useRouter();
  console.log("question from sesscodeeditor", question);
  const [docUrl, setDocUrl] = useState<AutomergeUrl>();

  useEffect(() => {
    if (sessionID) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SESSION_URL}/session/get-session/${sessionID}`
        )
        .then((res) => {
          console.log(res.data.docId);
          console.log("docId received");
          setDocUrl(res.data.docId);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 404) {
            router.push("/404");
          }
        });
    }
  }, [sessionID]);

  const [doc, changeDoc] = useDocument<Doc>(docUrl);
  useEffect(() => {
    console.log("doc", doc);
  }, [doc]);

  const increment = (value: any, event: any) => {
    console.log("reflecting changes in code editor through changeDoc...");
    changeDoc((d) => (d.text = value));
  };

  return (
    <CodeEditor
      question={question}
      currCode={doc?.text}
      onChangeCode={increment}
    />
  );
};
export default SessionCodeEditor;
