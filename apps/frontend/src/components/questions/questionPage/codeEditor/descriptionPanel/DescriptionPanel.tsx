import { Question } from "@/database/question/entities/question.entity";
import React, { useState } from "react";
import PanelHeader from "./PanelHeader";
import DescriptionContent from "./DescriptionContent";
import SubmissionContent from "./SubmissionContent";

type QuestionDescriptionPanelProps = {
  question: Question;
};

const QuestionDescriptionPanel: React.FC<QuestionDescriptionPanelProps> = ({
  question,
}) => {
  const [isSubmissionActive, setIsSubmissionActive] = useState<boolean>(false);

  const handleSubmissionClick = () => {
    setIsSubmissionActive(true);
  };

  const handleDescriptionClick = () => {
    setIsSubmissionActive(false);
  };

  return (
    <div className="flex flex-col">
      {/* Top tab */}
      <PanelHeader
        isSubmissionActive={isSubmissionActive}
        handleSubmissionClick={handleSubmissionClick}
        handleDescriptionClick={handleDescriptionClick}
      />

      {/* Bottom content */}
      {!isSubmissionActive ? (
        <DescriptionContent question={question} />
      ) : (
        <SubmissionContent />
      )}
    </div>
  );
};
export default QuestionDescriptionPanel;
