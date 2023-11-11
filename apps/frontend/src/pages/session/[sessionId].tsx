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
  const { sessionUser, isLoading: isLoadingUser } = useSessionUser();

  const sessionId = useRouter().query.sessionId as string;

  const {
    question,
    doc,
    chatroomId,
    isLoading: isLoadingSession,
    increment,
    language,
  } = useSessionCollab(
    sessionId,
    isLoadingUser,
    sessionUser.refreshToken,
    sessionUser.accessToken
  );

  console.log("wtf");

  return (
    <div>
      {isLoadingSession || isLoadingUser ? (
        <LoadingModal isLoading={isLoadingSession || isLoadingUser} />
      ) : (
        question && (
          <QuestionWorkspace
            question={question}
            doc={doc}
            increment={increment}
            initialLanguage={language}
            chatroomId={chatroomId}
          />
        )
      )}
    </div>
  );
}
