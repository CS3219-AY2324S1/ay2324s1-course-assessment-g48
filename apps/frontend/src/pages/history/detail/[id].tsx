import React from "react";
import { useRouter } from "next/router";
import CodeViewer from "@/components/history/historyPage/CodeViewer";
import useHistoryQuestionById from "@/hook/useHistoryQuestionById";
import TestcaseIndicator from "@/components/history/historyPage/TestcaseIndicator";
import ParticipantsIcon from "@/components/history/historyPage/ParticipantsIcon";
import { Status } from "@/utils/enums/Status";

type HistoryQuestionPageProps = {};

const HistoryQuestionPage: React.FC<HistoryQuestionPageProps> = () => {
  const router = useRouter();
  const qid = String(router.query.id).split("&");
  const { historyQuestion, participants } = useHistoryQuestionById(
    qid[0],
    qid[1],
  );

    function countCorrect() {
      let counter = 0
      if (historyQuestion?.testcases) {
        historyQuestion.testcases.forEach((testcase) => {
          if (Number(testcase.outcome) === Status.Accepted) {
            counter++
          }
        });
      }
      return counter
    }

  return (
    <div className=" lg:mx-52 lg:mt-20 mt-20 mx-5 h-full space-y-5 dark:bg-gray-900 pb-10">
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
                historyQuestion?.result === "Correct"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {historyQuestion?.result}
            </label>
          </div>
          <div className="mt-2">
            {participants.length === 2 && (
              <>
                <legend className="block text-base font-semibold leading-6 text-gray-900 dark:text-white">
                  Participant(s):
                </legend>
                <ParticipantsIcon participants={participants} />
              </>
            )}
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
      <div className="mt-2">
        <legend className="block text-base font-semibold leading-6 text-gray-900 dark:text-white">
          Result: {countCorrect()}/{historyQuestion?.testcases.length}
        </legend>
        <div className="pt-5 px-5">
          <TestcaseIndicator testCases={historyQuestion?.testcases ?? []} />
        </div>
      </div>
    </div>
  );
};
export default HistoryQuestionPage;
