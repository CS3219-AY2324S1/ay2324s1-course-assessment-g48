import TestCaseChip from "./TestCaseChip";
import InputOutput from "./InputOutput";
import { Key } from "react";
import { Question } from "@/database/question/entities/question.entity";

type TestCaseContentProps = {
  question: Question;
  handleTestCaseChipClick: (resultNum: number) => void;
  selectedTestCaseChip: number | null;
};

const TestCaseContent: React.FC<TestCaseContentProps> = ({
  question,
  handleTestCaseChipClick,
  selectedTestCaseChip,
}) => {
  return (
    <>
      <div className="flex">
        {question.testcases.map(
          (testcase: { number: Key | number | null | undefined }) => (
            <TestCaseChip
              key={testcase.number}
              testNum={testcase.number as number | null}
              onClick={() => handleTestCaseChipClick(testcase.number as number)}
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

export default TestCaseContent;
