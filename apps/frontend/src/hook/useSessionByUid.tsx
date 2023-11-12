import { getSessionsByUserId } from "@/database/session/sessionService";
import { useEffect, useState } from "react";
import useSessionUser from "./useSessionUser";

export interface Session {
  _id: string;
  users: number[];
  chatroomId: string;
  code: string;
}

function useSessionByUid() {
  const { sessionUser, isLoading: isLoadingUser } = useSessionUser();
  const { id: uid, accessToken, refreshToken } = sessionUser;
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    setIsLoading(true);
    if (!isLoadingUser) {
      // if (accessToken === null || refreshToken === null) return;
      getSessionsByUserId(uid, accessToken!, refreshToken!)
        .then((data) => {
          setSessions(data.sessions);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);
  return {
    sessions,
    isLoading,
  };
}

export default useSessionByUid;
