import { CompletedQuestion } from "@/database/history/entities/history.entity";
import useHistories from "@/hook/useHistories";
import useSessionUser from "@/hook/useSessionUser";
import { Role } from "@/utils/enums/Role";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type HistoryTableProps = {
  hidden?: boolean;
};

const HistoryTable: React.FC<HistoryTableProps> = ({ hidden }) => {
  const { sessionUser } = useSessionUser();
  const [userRole, setUserRole] = useState(sessionUser.role);
  const [accessToken, setAccessToken] = useState(sessionUser.accessToken);
  const router = useRouter();
  
  const { histories, totalHistories } = useHistories(sessionUser.id, accessToken);
  const [historyPerPage, setHistoryPerPage] = useState(10);

  function handleQuestionClick(
    historyId: string,
    historyQuestionId: string
  ): void {
    const seperator = "&";
    router.push(`/history/detail/${historyId}${seperator}${historyQuestionId}`);
  }

  useEffect(() => {
    setAccessToken(sessionUser.accessToken);
    setUserRole(sessionUser.role);
  }, [sessionUser]);

  return (
    <>
      <div className="overflow-auto shadow-md sm:rounded-lg">
        <table
          className="relative text-sm text-left text-gray-500 dark:text-gray-400 w-full"
          hidden={hidden}
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 center w-1/5">
                Time Submitted
              </th>
              <th scope="col" className="px-6 py-3 w-1/3 center">
                Question
              </th>
              <th scope="col" className="px-6 py-3 w-1/5">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Runtime
              </th>
              <th scope="col" className="px-6 py-3">
                Language
              </th>
              {userRole === Role.Admin && (
                <>
                  <th scope="col" className="px-6 py-3 center">
                    Delete
                  </th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {histories.map((history) =>
              history.completed.map((question: CompletedQuestion, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th scope="row" className="py-2 center">
                    {new Date(question.completedAt).toLocaleString()}
                  </th>
                  <td
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap center dark:text-white cursor-pointer"
                    onClick={() =>
                      handleQuestionClick(history._id, question._id)
                    }
                  >
                    {question.questionTitle}
                  </td>
                  <td className="px-6 py-4">{question.result}</td>
                  <td className={"px-6 py-4"}>{question.runTime}</td>
                  <td className="px-6 py-4">{question.language}</td>
                  {userRole === Role.Admin && (
                    <>
                      <td className="px-6 py-4 center">
                        <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full">
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default HistoryTable;
