import { CompletedQuestion } from "@/database/history/entities/history.entity";
import { getHistoryById } from "@/database/history/historyService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useError } from "./ErrorContext";
import { User } from "@/database/user/entities/user.entity";
import { getUserById } from "@/database/user/userService";

function useHistoryQuestionById(hid: string, qid: string, accessToken?: string | null, refreshToken?: string | null) {
  const {data: session} = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [historyQuestion, setHistoryQuestion] = useState<CompletedQuestion | null>(null);
  const [participants, setParticipants] = useState<User[]>([]);
  const { setError, clearError } = useError();

  useEffect(() => {
    async function fetchData() {
      if (hid) {
        setIsLoading(true);
        clearError()
        if (accessToken === null || refreshToken === null) return;
        try {
          const data = await getHistoryById(hid, qid, accessToken, refreshToken);
          console.log("data", data.userIds);
          if (data.accessToken) {
            session!.user!.accessToken = data.accessToken;
            console.log("Refresh accessToken", session);
        }
          setHistoryQuestion(data._doc);
          const users = await Promise.all(data.userIds.map(async (userId:number) => {
            const user = await getUserById(userId);
            return user;
          }));
          setParticipants(users);

          setIsLoading(false);
        } catch (error) {
          setError({
            type: 1,
            message: `Error fetching question:, ${error}`});
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, [hid, qid, accessToken, refreshToken, session]);

  return { historyQuestion, isLoading, participants};
}

export default useHistoryQuestionById;
