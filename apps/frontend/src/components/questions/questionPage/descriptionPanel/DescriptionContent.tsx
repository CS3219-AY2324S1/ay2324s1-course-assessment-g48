import { Question } from "@/database/question/entities/question.entity";
import { Complexity } from "@/utils/enums/Complexity";
import ReactMarkdown from "react-markdown";

type DescriptionContentProps = {
  question: Question;
};

const DescriptionContent: React.FC<DescriptionContentProps> = ({
  question,
}) => {
  function getComplexityColor(complexity: Complexity) {
    switch (complexity) {
      case Complexity.Easy:
        return "text-green-600 bg-green-700 dark:bg-green-800/50";
      case Complexity.Medium:
        return "text-yellow-600 bg-yellow-700 dark:bg-yellow-800/50";
      case Complexity.Hard:
        return "text-red-600 bg-red-700 dark:bg-red-800/50";
      default:
        console.error(`Unknown Complexity: ${complexity}`);
        return ""; // Default or unknown complexity
    }
  }
  return (
    <div className="flex px-0 py-4 overflow-y-auto bg-slate-50 dark:bg-gray-800 h-screen transition-all">
      <div className="px-5">
        <div className="w-full">
          {/* Title */}
          <div className="flex space-x-4">
            <div className="flex-1 mr-2 text-lg dark:text-white font-medium">
              {question.title}
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center mt-3">
            <div
              className={`${getComplexityColor(
                question.complexity as Complexity
              )} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium`}
            >
              {question.complexity}
            </div>
          </div>

          {/* Problem Statement(paragraphs) */}
          <div className="dark:text-white text-sm">
            <ReactMarkdown>{question.description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionContent;
