import { CompletedQuestion } from "@/database/history/entities/history.entity";
import { getHistoryById } from "@/database/history/historyService";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useError } from "./ErrorContext";
import useSessionUser from "./useSessionUser";
import { User } from "@/database/user/entities/user.entity";
import { getUserById } from "@/database/user/userService";

function useHistoryQuestionById(hid: string, qid: string) {
  const { update } = useSession();
  const { isLoadingUser, sessionUser } = useSessionUser();
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyQuestion, setHistoryQuestion] =
    useState<CompletedQuestion | null>(null);
  const [participants, setParticipants] = useState<User[]>([]);
  const { setError, clearError } = useError();

  useEffect(() => {
    async function fetchData() {
      if (hid) {
        setIsLoadingHistory(true);
        clearError();
        if (isLoadingUser) return;
        try {
          const data = await getHistoryById(
            hid,
            qid,
            sessionUser.accessToken,
            sessionUser.refreshToken
          );
          if (data.accessToken) {
            update({
              accessToken: data.accessToken,
              accessTokenExpiry: data.accessTokenExpiry,
            });
          }
          setHistoryQuestion(data);
          setHistoryQuestion(data._doc);
          const users = await Promise.all(data.userIds.map(async (userId:number) => {
            const user = await getUserById(userId);
            return user;
          }));
          setParticipants(users);
          setIsLoadingHistory(false);
        } catch (error) {
          setError({
            type: 1,
            message: `Error fetching question:, ${error}`,
          });
          setIsLoadingHistory(false);
        }
      }
    }
    fetchData();
  }, [hid, qid, isLoadingUser, update]);

  return { historyQuestion, isLoadingHistory, participants };
}

export default useHistoryQuestionById;
