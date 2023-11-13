import useSessionByUid from "@/hook/useSessionByUid";
import useSessionUser from "@/hook/useSessionUser";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

export default function SessionsPage() {
  const { sessions, isLoading: isLoadingSession } = useSessionByUid();
  const router = useRouter();

  const handleClick = (sessionId: string) => {
    router.push(`/session/${sessionId}`);
  };

  return !isLoadingSession ? (
    <div className="m-auto">
      {sessions.map((session, index) => (
        <button key={index} onClick={() => handleClick(session._id)}>
          {session._id}
        </button>
      ))}
    </div>
  ) : (
    <div></div>
  );
}
