import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSessionUser from "@/hook/useSessionUser";
import CodeViewer from "@/components/history/historyPage/CodeViewer";
import useHistoryQuestionById from "@/hook/useHistoryQuestionById";

type HistoryQuestionPageProps = {};

const HistoryQuestionPage: React.FC<HistoryQuestionPageProps> = () => {
  const router = useRouter();
  const qid = String(router.query.id).split("&");
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role);
  const { historyQuestion } = useHistoryQuestionById(qid[0], qid[1], userRole);
    

  useEffect(() => {
    setUserRole(sessionUser.role);
  }, [sessionUser]);

  return (
    <div className="h-screen dark:bg-gray-900">
      <CodeViewer answer={historyQuestion?.answer ?? ""} />
    </div>
  );
};
export default HistoryQuestionPage;
