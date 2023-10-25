import TestCaseChip from "./TestCaseChip";
import InputOutput from "./InputOutput";
import { Question } from "@/database/question/entities/question.entity";
import { Key } from "react";

type TestCaseHeaderProps = {
  question: Question;
  handleTestCaseChipClick: (resultNum: number) => void;
  selectedTestCaseChip: number | null;
};

const TestCaseHeader: React.FC<TestCaseHeaderProps> = (
  question: { testcases: any[] },
  handleTestCaseChipClick: (arg0: any) => void,
  selectedTestCaseChip: number | null
) => {
  return (
    <>
      <div className="flex h-10 items-center space-x-6">
        <div className="flex flex-col h-full justify-center cursor-pointer relative ">
          <div className="text-sm font-medium leading-5 dark:text-white">
            Test Cases
          </div>
          <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-black dark:bg-white" />
        </div>
        <div className="flex flex-col h-full justify-center cursor-pointer relative ">
          <div className="text-sm font-medium leading-5 dark:text-white">
            Result
          </div>
        </div>
      </div>
      <div className="flex">
        {question.testcases.map(
          (testcase: { number: Key | number | null | undefined }) => (
            <TestCaseChip
              key={testcase.number}
              testNum={testcase.number as number | null}
              onClick={() =>
                handleTestCaseChipClick(testcase.number as number | null)
              }
            />
          )
        )}
      </div>

      {selectedTestCaseChip !== null && (
        <InputOutput
          inputText={question.testcases[selectedTestCaseChip - 1].input}
          outputText={question.testcases[selectedTestCaseChip - 1].output}
        />
      )}
    </>
  );
};
export default TestCaseHeader;
