import { Question } from "@/database/question/entities/question.entity";
import { Category } from "@/utils/enums/Category";
import React from "react";

type CategoriesInputProps = {
  newQuestion: Question;
  setNewQuestion: (question: Question) => void;
};

const CategoriesInput: React.FC<CategoriesInputProps> = ({
  newQuestion,
  setNewQuestion,
}) => {
  return (
    <div className="mt-10 space-y-10">
      <fieldset>
        <legend className="text-sm font-semibold leading-6 text-gray-900">
          Categories
        </legend>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Choose the categories of the question
        </p>
        <div className="mt-6 space-y-6 category-container">
          {Object.values(Category).map((category) => (
            <div className="relative flex gap-x-3" key={category}>
              <div className="flex h-6 items-center">
                <input
                  id={`${category}`}
                  name="catergory"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  value={newQuestion.categories}
                  onChange={(e) => {
                    const { checked } = e.target;
                    if (checked) {
                      // If the checkbox is checked, add the category to the array
                      setNewQuestion({
                        ...newQuestion,
                        categories: [...newQuestion.categories, category],
                      });
                    } else {
                      // If the checkbox is unchecked, remove the category from the array
                      setNewQuestion({
                        ...newQuestion,
                        categories: newQuestion.categories.filter(
                          (item) => item !== category
                        ),
                      });
                    }
                    console.log(newQuestion.categories);
                  }}
                />
              </div>
              <div className="text-sm leading-6">
                <label
                  htmlFor={`${category}`}
                  className="font-medium text-gray-900"
                >
                  {category}
                </label>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};
export default CategoriesInput;
