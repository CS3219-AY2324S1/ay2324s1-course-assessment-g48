import React, { useEffect, useState } from "react";
import { AutomergeUrl } from "@automerge/automerge-repo";
import axios from "@/pages/api/axios/axios";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Doc } from "@/utils/doc";
import CodeEditor from "./CodeEditor";
import { useRouter } from "next/router";
import { Question } from "@/database/question/entities/question.entity";
import { Language } from "@/utils/class/Language";
import monaco from "monaco-editor";

type SessionCodeEditorProps = {
  question: Question;
  sessionId: string;
  initialLanguage: Language;
};

const SessionCodeEditor: React.FC<SessionCodeEditorProps> = ({
  question,
  sessionId,
  initialLanguage,
}) => {
  const sessionID = sessionId as string;
  const router = useRouter();

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

  console.log("Question", question)
  const starterCode =
    question.starterCode.find(
      (starterCode) => starterCode.languageId === initialLanguage.id
    )?.code ?? "";

  const [doc, changeDoc] = useDocument<Doc>(docUrl);
  if (doc?.text === undefined) {
    changeDoc((d) => (d.text = starterCode));
  }
  useEffect(() => {
    console.log("doc", doc);
  }, [doc]);

  const increment = (
    value?: string,
    event?: monaco.editor.IModelContentChangedEvent
  ) => {
    console.log(
      "reflecting changes in code editor through changeDoc...",
      event
    );
    changeDoc((d) => (d.text = value ?? ""));
  };

  return (
    <CodeEditor
      question={question}
      currSessionCode={[
        {
          languageId: initialLanguage.id,
          code: doc?.text ?? "",
        },
      ]}
      onChangeCode={increment}
      initialLanguage={initialLanguage}
      hasSession={true}
    />
  );
};
export default SessionCodeEditor;
