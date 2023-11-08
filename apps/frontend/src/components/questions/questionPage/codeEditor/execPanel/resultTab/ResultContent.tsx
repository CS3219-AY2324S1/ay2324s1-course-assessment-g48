import { Question } from "@/database/question/entities/question.entity";
import OutputMetrics from "./OutputMetrics";
import OutputWindow from "./OutputWindow";
import TestCaseChip from "../testCaseTab/TestCaseChip";

type ResultContentProps = {
  outputDetails: any;
  question: Question;
  selectedTestCase: number;
  handleSelectedTestCase: (testNum: number) => void;
};

const ResultCaseContent: React.FC<ResultContentProps> = ({
  outputDetails,
  question,
  selectedTestCase,
  handleSelectedTestCase,
}) => {
  return (
    <>
      <div className="flex">
        {question.testcases.map((testcase, index) => (
          <TestCaseChip
            key={index + 1}
            testNum={index + 1}
            onClick={() => handleSelectedTestCase(index + 1)}
            outputDetails={outputDetails[index]}
          />
        ))}
      </div>
      {selectedTestCase !== null && (
        <div className="text-sm font-medium leading-5 dark:text-white">
          <div className="font-semibold mb-12">
            <OutputWindow
              outputDetails={outputDetails[selectedTestCase - 1]}
              expected_output={question.testcases[selectedTestCase - 1].output}
            />
            <OutputMetrics
              outputDetails={outputDetails[selectedTestCase - 1]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ResultCaseContent;
