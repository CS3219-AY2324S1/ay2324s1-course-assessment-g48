import { getSessionsByUserId } from "@/database/session/sessionService";
import { useEffect, useState } from "react";
import useSessionUser from "./useSessionUser";
import { useSession } from "next-auth/react";

export interface Session {
  _id: string;
  users: number[];
  chatroomId: string;
  code: string;
}

function useSessionByUid() {
  const { update } = useSession();
  const { sessionUser, isLoadingUser } = useSessionUser();
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    setIsLoading(true);
    if (!isLoadingUser) {
      getSessionsByUserId(sessionUser.id, sessionUser.accessToken, sessionUser.refreshToken)
        .then((data) => {
          if (data.accessToken) {
            update({ accessToken: data.accessToken });
          }
          setSessions(data.sessions);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isLoadingUser, update]);
  return {
    sessions,
    isLoading,
  };
}

export default useSessionByUid;
