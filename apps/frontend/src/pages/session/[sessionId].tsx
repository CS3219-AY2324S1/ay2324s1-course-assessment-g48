import { useRouter } from "next/router";
import QuestionWorkspace from "@/components/questions/questionPage/QuestionWorkspace";
import useSessionCollab from "@/hook/useSessionCollab";
import LoadingModal from "@/components/LoadingModal";

export default function Session() {
  const sessionId = useRouter().query.sessionId as string;

  const {
    question,
    doc,
    chatroomId,
    isLoading: isLoadingSession,
    increment,
    language,
  } = useSessionCollab(sessionId);

  return (
    <div>
      {isLoadingSession ? (
        <LoadingModal isLoading={isLoadingSession} />
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
