import useSessionByUid from "@/hook/useSessionByUid";
import useSessionUser from "@/hook/useSessionUser";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

export default function SessionsPage() {
  const { sessionUser } = useSessionUser();
  const { sessions, isLoading } = useSessionByUid(sessionUser.id);
  console.log(sessions);
  const router = useRouter();

  const handleClick = (sessionId: string) => {
    console.log(sessionId);
    router.push(`/session/${sessionId}`);
  };

  return !isLoading ? (
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
