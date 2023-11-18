import { Question } from "@/database/question/entities/question.entity";
import { Complexity } from "@/utils/enums/Complexity";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";

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
    <div className="flex px-0 py-4 overflow-y-auto bg-slate-50 dark:bg-gray-800 h-screen transition-all ">
      <div className="px-5 w-full py-3">
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
        <div className="dark:text-white text-sm mt-3">
          <ReactMarkdown remarkPlugins={[remarkMath]}>
            {question.description}
          </ReactMarkdown>
        </div>

        {question.examples?.map((example, index) => (
          <div key={index} className="">
            <div className="dark:text-white font-bold mt-3">
              Example {index + 1}:
            </div>
            <div key={index} className="dark:text-white text-sm mt-3">
              <ReactMarkdown remarkPlugins={[remarkMath]}>
                {question.examples[index]}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        <div className="dark:text-white font-bold mt-3">Constraints:</div>
        <div className="dark:text-white text-sm mt-3">
          <ReactMarkdown remarkPlugins={[remarkMath]}>
            {question.constraints}
          </ReactMarkdown>
        </div>

        {question.followUp !== "" && (
          <>
            <div className="dark:text-white font-bold mt-3">Follow-up:</div>
            <div className="dark:text-white text-sm mt-3">
              <ReactMarkdown remarkPlugins={[remarkMath]}>
                {question.followUp}
              </ReactMarkdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DescriptionContent;
