import { Question } from "@/database/question/entities/question.entity";
import OutputMetrics from "./OutputMetrics";
import OutputWindow from "./OutputWindow";
import TestCaseChip from "../testCaseTab/TestCaseChip";

type ResultContentProps = {
  outputDetails: any;
  question: Question;
  selectedTestCaseChip: number;
  handleTestCaseChipClick: (testNum: number) => void;
};

const ResultCaseContent: React.FC<ResultContentProps> = ({
  outputDetails,
  question,
  selectedTestCaseChip,
  handleTestCaseChipClick,
}) => {
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
            <OutputWindow
              outputDetails={outputDetails}
              expected_output={
                question.testcases[selectedTestCaseChip - 1].output
              }
            />
            <OutputMetrics outputDetails={outputDetails} />
          </div>
        </div>
      )}
    </>
  );
};

export default ResultCaseContent;
