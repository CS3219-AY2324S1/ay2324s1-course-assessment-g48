import React, { useState } from "react";
import TestCaseContent from "./testCaseTab/TestCaseContent";
import ResultContent from "./resultTab/ResultContent";
import ExecHeader from "./ExecHeader";
import { Question } from "@/database/question/entities/question.entity";

type ExecPanelProps = {
  question: Question;
  outputDetails: string;
  selectedTestCaseChip: number | null;
  handleTestCaseChipClick: (testNum: number) => void;
};

const ExecPanel: React.FC<ExecPanelProps> = ({
  question,
  outputDetails,
  selectedTestCaseChip,
  handleTestCaseChipClick,
}) => {
  const [isResultActive, setIsResultActive] = useState<boolean>(false);

  const handleResultClick = () => {
    setIsResultActive(true);
  };

  const handleTestCaseClick = () => {
    setIsResultActive(false);
  };

  return (
    <div className="w-full px-5 overflow-auto dark:bg-neutral-800">
      <ExecHeader
        handleResultClick={handleResultClick}
        handleTestCaseClick={handleTestCaseClick}
        isResultActive={isResultActive}
      />

      {!isResultActive ? (
        <TestCaseContent question={question} />
      ) : (
        <ResultContent
          outputDetails={outputDetails}
          question={question}
          selectedTestCaseChip={selectedTestCaseChip}
          handleTestCaseChipClick={handleTestCaseChipClick}
        />
      )}
    </div>
  );
};

export default ExecPanel;
