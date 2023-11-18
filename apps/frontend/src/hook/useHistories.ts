import { useEffect, useState, useMemo } from "react";
import {
  CompletedQuestion,
  History,
} from "@/database/history/entities/history.entity";
import { getHistoryByUserId } from "@/database/history/historyService";
import { useSession } from "next-auth/react";
import useSessionUser from "./useSessionUser";

function useHistories(userId: number) {
  const { update } = useSession();
  const { isLoadingUser, sessionUser } = useSessionUser();
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [histories, setHistories] = useState<History[]>([]);
  const [trigger, setTrigger] = useState(false);
  const totalHistories = useMemo(() => 0, []);
  const [completedQuestion, setCompletedQuestion] = useState<
    CompletedQuestion[]
  >([]);
  const handleTrigger = () => {
    setTrigger(!trigger); // Toggles the trigger state
  };

  useEffect(() => {
    const handleUserHistories = () => {
      setCompletedQuestion([]);
      histories.forEach((history) => {
        setCompletedQuestion((prevCompletedQuestion) => [
          ...prevCompletedQuestion,
          ...history.completed,
        ]);
      });
    };
    handleUserHistories();
  }, [histories]);

  useEffect(() => {
    setIsLoadingHistory(true);
    if (isLoadingUser) return;
    getHistoryByUserId(
      userId,
      sessionUser.accessToken,
      sessionUser.refreshToken
    )
      .then((histories) => {
        if (histories.accessToken) {
          update({ accessToken: histories.accessToken, accessTokenExpiry: histories.accessTokenExpiry });
        }
        setHistories(histories);
        setTimeout(() => {
          setIsLoadingHistory(false);
        }, 50);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [trigger, userId, isLoadingUser, update]);

  return {
    histories,
    totalHistories,
    setHistories,
    isLoadingHistory,
    handleTrigger,
    completedQuestion,
  };
}

export default useHistories;
