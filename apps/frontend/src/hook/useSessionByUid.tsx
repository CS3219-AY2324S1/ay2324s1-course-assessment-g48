import { getSessionsByUserId } from "@/database/session/sessionService";
import { useEffect, useState } from "react";

export interface Session {
  _id: string;
  users: number[];
  chatroomId: string;
  code: string;
}

function useSessionByUid(
  uid: number
  //   accessToken?: string | null,
  //   refreshToken?: string | null
) {
  //   const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    setIsLoading(true);
    // if (accessToken === null || refreshToken === null) return;
    getSessionsByUserId(uid)
      .then((data) => {
        setSessions(data.sessions);
        setTimeout(() => {
          setIsLoading(false);
        }, 50);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return {
    sessions,
    isLoading,
  };
}

export default useSessionByUid;
