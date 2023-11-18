import React, { useState } from "react";
import TestCaseContent from "./testCaseTab/TestCaseContent";
import ResultContent from "./resultTab/ResultContent";
import ExecHeader from "./ExecHeader";
import { Question } from "@/database/question/entities/question.entity";

type ExecPanelProps = {
  question: Question;
  outputDetails: string | object;
};

const ExecPanel: React.FC<ExecPanelProps> = ({ question, outputDetails }) => {
  const [isResultActive, setIsResultActive] = useState<boolean>(false);
  const [selectedTestCase, setSelectedTestCase] = useState<number>(1);

  const handleResultClick = () => {
    setIsResultActive(true);
  };

  const handleTestCasesClick = () => {
    setIsResultActive(false);
  };

  const handleSelectedTestCase = (testNum: number) => {
    setSelectedTestCase(testNum);
  };

  return (
    <div className="w-full px-5 overflow-auto dark:bg-neutral-800">
      <ExecHeader
        handleResultClick={handleResultClick}
        handleTestCasesClick={handleTestCasesClick}
        isResultActive={isResultActive}
      />

      {!isResultActive ? (
        <TestCaseContent question={question} outputDetails={outputDetails} />
      ) : (
        <ResultContent
          outputDetails={outputDetails}
          question={question}
          selectedTestCase={selectedTestCase}
          handleSelectedTestCase={handleSelectedTestCase}
        />
      )}
    </div>
  );
};

export default ExecPanel;
