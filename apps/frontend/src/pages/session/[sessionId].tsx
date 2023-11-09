import { useRouter } from "next/router";
import useQuestionById from "@/hook/useQuestionById";
import { useEffect, useState } from "react";
import useSessionUser from "@/hook/useSessionUser";
import { languageOptions } from "@/utils/constants/LanguageOptions";
import QuestionWorkspace from "@/components/questions/questionPage/QuestionWorkspace";
import { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { Doc } from "@automerge/automerge/next";
import axios from "axios";
import { Language } from "@/utils/class/Language";
import useSessionCollab from "@/hook/useSessionCollab";
import LoadingModal from "@/components/LoadingModal";

export default function Session() {
  //   const router = useRouter();

  //   const { sessionUser } = useSessionUser();

  const sessionId = useRouter().query.sessionId as string;
  //   const [questionId, setQuestionId] = useState<string>("");
  //   const { question } = useQuestionById(
  //     questionId,
  //     sessionUser.accessToken,
  //     sessionUser.refreshToken
  //   );
  //   const [language, setLanguage] = useState<Language>(); // hardcoded, to be changed
  //   const [docUrl, setDocUrl] = useState<AutomergeUrl>();
  //   const [doc, changeDoc] = useDocument<Doc<any>>(docUrl);
  //   const [chatroomId, setChatroomId] = useState<string>("");
  //   let increment: (value: string) => void = (value: string) => {
  //     console.log("reflecting changes in code editor through changeDoc...");
  //     changeDoc((d: any) => (d.text = value));
  //   };

  //   useEffect(() => {
  //     if (sessionID) {
  //       axios
  //         .get(
  //           `${process.env.NEXT_PUBLIC_SESSION_URL}/session/get-session/${sessionID}`
  //         )
  //         .then((res) => {
  //           console.log(res.data.docId);
  //           console.log(res.data.chatroomId);
  //           console.log("docId received");
  //           console.log(res.data);
  //           setQuestionId(res.data.question);
  //           setLanguage(
  //             languageOptions.filter(
  //               (language) => language.id == res.data.language
  //             )[0]
  //           );
  //           setDocUrl(res.data.docId);
  //           setChatroomId(res.data.chatroomId);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           router.push("/404");
  //         });
  //     }
  //   }, [sessionID]);

  const { question, doc, chatroomId, isLoading, increment, language } =
    useSessionCollab(sessionId);

  return (
    <div>
      <LoadingModal isLoading={isLoading} />
      {question && (
        <QuestionWorkspace
          question={question}
          doc={doc}
          increment={increment}
          initialLanguage={language}
          chatroomId={chatroomId}
        />
      )}
    </div>
  );
}
