import { Question } from "@/database/question/entities/question.entity";
import { Complexity } from "@/utils/enums/Complexity";
import React from "react";

type ComplexityInputProps = {
  newQuestion: Question;
  setNewQuestion: (question: Question) => void;
};

const ComplexityInput: React.FC<ComplexityInputProps> = ({
  newQuestion,
  setNewQuestion,
}) => {
  return (
    <div className="mt-10 space-y-10">
      <fieldset>
        <legend className="text-sm font-semibold leading-6 text-gray-900">
          Complexity
        </legend>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Choose the complexity of the question
        </p>
        <div className="mt-6 space-y-6">
          {Object.values(Complexity).map((complexityOption) => (
            <div className="flex items-center gap-x-3" key={complexityOption}>
              <input
                id={`complexity${complexityOption}`}
                name="complexity"
                value={complexityOption}
                type="radio"
                checked={newQuestion.complexity === complexityOption}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                onChange={() =>
                  setNewQuestion({
                    ...newQuestion,
                    complexity: complexityOption,
                  })
                }
              />
              <label
                htmlFor={`complexity${complexityOption}`}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {complexityOption}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};
export default ComplexityInput;
