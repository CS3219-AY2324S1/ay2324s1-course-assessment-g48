import { Question } from "@/database/question/entities/question.entity";
import OutputMetrics from "./OutputMetrics";
import OutputWindow from "./OutputWindow";
import { useState } from "react";
import TestCaseChip from "../testCaseTab/TestCaseChip";

type ResultContentProps = {
  outputDetails: any;
  question: Question;
};

const ResultCaseContent: React.FC<ResultContentProps> = ({
  outputDetails,
  question,
}) => {
  const [selectedTestCaseChip, setSelectedTestCaseChip] = useState<
    number | null
  >(1);

  const handleTestCaseChipClick = (testNum: number) => {
    setSelectedTestCaseChip(testNum);
  };
  return (
    <>
      <div className="flex">
        {question.testcases.map((testcase, index) => (
          <TestCaseChip
            key={index + 1}
            testNum={index + 1}
            onClick={() => handleTestCaseChipClick(index + 1)}
          />
        ))}
      </div>
      {selectedTestCaseChip !== null && (
        <div className="text-sm font-medium leading-5 dark:text-white">
          <div className="font-semibold mb-12">
            <OutputWindow outputDetails={outputDetails} />
            <OutputMetrics outputDetails={outputDetails} />
          </div>
        </div>
      )}
    </>
  );
};

export default ResultCaseContent;
