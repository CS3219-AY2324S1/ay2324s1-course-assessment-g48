import { Question } from "@/database/question/entities/question.entity";

type ResultContentProps = {};

const ResultCaseContent: React.FC<ResultContentProps> = ({}) => {
  return (
    <>
      <div className="text-sm font-medium leading-5 dark:text-white">
        <span className="text-green-500">Success</span>
      </div>
    </>
  );
};

export default ResultCaseContent;
