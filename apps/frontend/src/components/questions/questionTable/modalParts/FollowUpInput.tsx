import { Question } from "@/database/question/entities/question.entity";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";

type FollowUpInputProps = {
  newQuestion: Question;
  setNewQuestion: (question: Question) => void;
};

const FollowUpInput: React.FC<FollowUpInputProps> = ({
  newQuestion,
  setNewQuestion,
}) => {
  return (
    <div className="col-span-full">
      <legend className="block text-sm font-semibold leading-6 text-gray-900">
        Follow-up Question
      </legend>
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Markdown is supported
      </p>
      <div className="mt-2">
        <textarea
          id="followUp"
          name="followUp"
          rows={3}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={newQuestion.followUp}
          onChange={(e) =>
            setNewQuestion({
              ...newQuestion,
              followUp: e.target.value,
            })
          }
        />
      </div>
      <div className="mt-3">
        <article className="prose max-w-none">
          <ReactMarkdown remarkPlugins={[remarkMath]}>
            {newQuestion.followUp}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};
export default FollowUpInput;
