import { Question } from "@/database/question/entities/question.entity";

type SubmissionContentProps = {};

const SubmissionContent: React.FC<SubmissionContentProps> = ({}) => {
  return (
    <>
      <div className="flex px-0 py-4 overflow-y-auto bg-slate-50 dark:bg-gray-800 h-screen transition-all">
        <div className="px-5">
          <div className="w-full">
            <span className="text-green-500">Success</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionContent;
