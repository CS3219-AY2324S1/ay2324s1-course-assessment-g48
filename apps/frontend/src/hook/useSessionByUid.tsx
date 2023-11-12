import { getSessionsByUserId } from "@/database/session/sessionService";
import { useEffect, useState } from "react";
import useSessionUser from "./useSessionUser";

export interface Session {
  _id: string;
  users: number[];
  chatroomId: string;
  code: string;
}

function useSessionByUid(startIndex:number, endIndex:number) {
  const { sessionUser, isLoading: isLoadingUser } = useSessionUser();
  const { id: uid, accessToken, refreshToken } = sessionUser;
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    setIsLoading(true);
    if (!isLoadingUser) {
      // if (accessToken === null || refreshToken === null) return;
      getSessionsByUserId(uid, startIndex, endIndex, accessToken!, refreshToken!)
        .then((data) => {
          setSessions(data.sessions);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [startIndex, endIndex, isLoadingUser]);
  return {
    sessions,
    isLoading,
  };
        
}

export default useSessionByUid;
