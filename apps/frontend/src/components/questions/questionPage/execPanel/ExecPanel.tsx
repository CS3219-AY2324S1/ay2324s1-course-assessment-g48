import React, { useState } from "react";
import TestCaseContent from "./TestCaseContent";
import ResultContent from "./ResultContent";
import TestCaseHeader from "./TestCaseHeader";
import { Question } from "@/database/question/entities/question.entity";

type ExecPanelProps = {
  question: Question;
};

const ExecPanel: React.FC<ExecPanelProps> = ({ question }) => {
  const [isResultActive, setIsResultActive] = useState<boolean>(false);
  const [selectedTestCaseChip, setSelectedTestCaseChip] = useState<
    number | null
  >(1);

  const handleResultClick = () => {
    setIsResultActive(true);
  };

  const handleTestCaseClick = () => {
    setIsResultActive(false);
  };

  const handleTestCaseChipClick = (testNum: number) => {
    setSelectedTestCaseChip(testNum);
  };

  return (
    <div className="w-full px-5 overflow-auto dark:bg-neutral-800">
      <TestCaseHeader
        handleResultClick={handleResultClick}
        handleTestCaseClick={handleTestCaseClick}
        isResultActive={isResultActive}
      />

      {!isResultActive ? (
        <TestCaseContent
          question={question}
          handleTestCaseChipClick={handleTestCaseChipClick}
          selectedTestCaseChip={selectedTestCaseChip}
        />
      ) : (
        <ResultContent />
      )}
    </div>
  );
};

export default ExecPanel;
