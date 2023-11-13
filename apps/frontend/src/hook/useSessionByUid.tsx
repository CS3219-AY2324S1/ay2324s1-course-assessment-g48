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

function useSessionByUid(startIndex: number, endIndex: number) {
  const { update } = useSession();
  const { sessionUser, isLoadingUser } = useSessionUser();
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    setIsLoading(true);
    if (!isLoadingUser) {
      // if (accessToken === null || refreshToken === null) return;
      getSessionsByUserId(sessionUser.id, startIndex, endIndex, sessionUser.accessToken, sessionUser.refreshToken)
        .then((data) => {
          if (data.accessToken) {
            update({ accessToken: data.accessToken, accessTokenExpiry: data.accessTokenExpiry });
          }
          setSessions(data.sessions);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [startIndex, endIndex, isLoadingUser, update]);
  return {
    sessions,
    isLoading,
  };
        
}

export default useSessionByUid;
