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
    <div className=" lg:mx-52 lg:mt-20 mt-20 mx-5 h-full space-y-5 dark:bg-gray-900">
      <legend className="block text-2xl font-semibold leading-6 text-gray-900 dark:text-white">
        Submission {historyQuestion?._id}
      </legend>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col lg:w-1/2">
          <div className="mt-2">
            <legend className="block text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Question Title:
            </legend>
            <label
              className="text-gray-900 dark:text-white cursor-pointer underline"
              onClick={() =>
                router.push(`/questions/${historyQuestion?.questionId}`)
              }
            >
              {historyQuestion?.questionTitle}
            </label>
          </div>
          <div className="mt-2">
            <legend className="block text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Status:
            </legend>
            <label
              className={`text-gray-900 capitalize 
              ${
                historyQuestion?.result === "correct"
                  ? "text-green-600"
                  : "text-red-600" }`}
            >
              {historyQuestion?.result}
            </label>
          </div>
        </div>
        <div className="flex flex-col lg:w-1/2 justify-end">
          <div className="mt-4 lg:mt-0">
            <legend className="block text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Submitted:
            </legend>
            <label className="text-gray-900 dark:text-white">
              {new Date(historyQuestion?.completedAt ?? "").toLocaleString()}
            </label>
          </div>
          <div className="mt-2">
            <legend className="block text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Language:
            </legend>
            <label className="text-gray-900 dark:text-white">
              {historyQuestion?.language}
            </label>
          </div>
        </div>
      </div>

      <CodeViewer answer={historyQuestion?.answer ?? ""} />
    </div>
  );
};
export default HistoryQuestionPage;
