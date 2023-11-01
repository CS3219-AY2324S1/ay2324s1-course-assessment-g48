import React, { useState } from "react";
import TestCaseContent from "./testCaseTab/TestCaseContent";
import ResultContent from "./resultTab/ResultContent";
import ExecHeader from "./ExecHeader";
import { Question } from "@/database/question/entities/question.entity";

type ExecPanelProps = {
  question: Question;
  outputDetails: string;
};

const ExecPanel: React.FC<ExecPanelProps> = ({ question, outputDetails }) => {
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
          handleTestCaseChipClick={handleTestCaseChipClick}
          selectedTestCaseChip={selectedTestCaseChip}
        />
      )}
    </div>
  );
};

export default ExecPanel;
