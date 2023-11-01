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
        {question.testcases.map((testcase, index) => (
            <TestCaseChip
              key={index+1}
              testNum={index+1}
              onClick={() => handleTestCaseChipClick(index+1)}
            />
        ))}
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
