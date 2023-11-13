// TestcaseIndicator.tsx
import { HistoryQuestionTestcase } from "@/database/history/entities/history.entity";
import { statuses } from "@/utils/constants/statuses";
import { Status } from "@/utils/enums/Status";
import test from "node:test";
import React from "react";

interface TestcaseIndicatorProps {
  testCases: HistoryQuestionTestcase[];
}

const TestcaseIndicator: React.FC<TestcaseIndicatorProps> = ({ testCases }) => {

    return (
    <div className="flex space-x-5 items-center">
      {testCases.map((testcase, index) => {
        return (
          <div className="relative hover:cursor-pointer" key={index}>
            <div
              className={`w-4 h-4 rounded-full ${
                Number(testcase.outcome) === Status.Accepted ? "bg-green-500" : "bg-red-500"} transition-colors duration-200`}
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs text-center p-1 rounded bg-gray-700 text-white opacity-0 hover:opacity-100 transition-opacity duration-200">
                    {testcase.runTime}ms
                    {"\n" + statuses.find((status) => status.id === Number(testcase.outcome))?.description}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestcaseIndicator;
