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
        {question.testcases.map((testcase, index) => {
          const testNum = index + 1; // Calculate or assign the desired value
          return (
            <TestCaseChip
              key={testNum}
              testNum={testNum as number | null}
              onClick={() => handleTestCaseChipClick(testNum as number)}
            />
          );
        })}
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
