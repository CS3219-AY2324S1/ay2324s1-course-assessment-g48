import { CompletedQuestion } from "@/database/history/entities/history.entity";
import { getHistoryById } from "@/database/history/historyService";
import { Role } from "@/utils/enums/Role";
import { useEffect, useState } from "react";

function useHistoryQuestionById(hid: string, qid: string, userRole?: Role) {
  const [isLoading, setIsLoading] = useState(false);
  const [historyQuestion, setHistoryQuestion] = useState<CompletedQuestion | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (hid) {
        setIsLoading(true);
        setError(null);
        if (userRole === Role.Unknown) return;
        try {
          const data = await getHistoryById(hid, qid, userRole);
          setHistoryQuestion(data);
          setIsLoading(false);
        } catch (error) {
          setError(`Error fetching question:, ${error}`);
          setIsLoading(false);
        }
      }
    }
    fetchData();
  }, [hid, userRole]);

  return { historyQuestion, isLoading, error };
}

export default useHistoryQuestionById;
