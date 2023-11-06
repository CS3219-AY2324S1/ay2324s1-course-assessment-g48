import { Question } from "@/database/question/entities/question.entity";
import React from "react";

type TitleInputProps = {
  hasError: boolean;
  value: string;
  valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputBlurHandler: () => void;
  newQuestion: Question;
  setNewQuestion: (question: Question) => void;
};

const TitleInput: React.FC<TitleInputProps> = ({
  hasError,
  value,
  valueChangeHandler,
  inputBlurHandler,
  newQuestion,
  setNewQuestion,
}) => {
  return (
    <div className="col-span-full">
      <legend className="block text-sm font-semibold leading-6 text-gray-900">
        Title
      </legend>
      <div className="mt-2">
        <div
          className={`flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset ${
            hasError
              ? "focus-within:ring-red-600"
              : "focus-within:ring-indigo-600"
          } sm:max-w-full`}
        >
          <input
            type="text"
            name="title"
            id="title"
            className="block ml-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              valueChangeHandler(event);
              setNewQuestion({
                ...newQuestion,
                title: event.target.value,
              });
            }}
            onBlur={inputBlurHandler}
          />
        </div>
        {hasError && value.trim().length <= 0 && (
          <label className="mt-1 text-sm leading-6 text-red-600">
            Input cannot be empty.
          </label>
        )}
      </div>
    </div>
  );
};
export default TitleInput;
