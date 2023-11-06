import TestCaseChip from "./TestCaseChip";
import { Question } from "@/database/question/entities/question.entity";
import TestCaseBox from "./TestCaseBox";
import { useState } from "react";

type TestCaseContentProps = {
  question: Question;
  // handleTestCaseChipClick: (resultNum: number) => void;
  // selectedTestCaseChip: number | null;
};

const TestCaseContent: React.FC<TestCaseContentProps> = ({
  question,
  // handleTestCaseChipClick,
  // selectedTestCaseChip,
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
        <div className="mb-12">
          <TestCaseBox
            title={"Input:"}
            content={question.testcases[selectedTestCaseChip - 1].input}
          />
          <TestCaseBox
            title={"Expected Output:"}
            content={question.testcases[selectedTestCaseChip - 1].output}
          />
        </div>
      )}
    </>
  );
};

export default TestCaseContent;
