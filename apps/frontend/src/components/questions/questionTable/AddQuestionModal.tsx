import { useState } from "react";
import { Complexity } from "../../../utils/enums/Complexity";
import { Category } from "../../../utils/enums/Category";
import useInput from "../../../hook/useInput";
import ReactMarkdown from "react-markdown";
import {
  Question,
  TestCase,
  initialQuestion,
  initialTestCase,
} from "../../../database/question/entities/question.entity";
import Modal from "../../Modal";
import remarkMath from "remark-math";
import { useError } from "@/hook/ErrorContext";
import TestCases from "./modalParts/TestCases";
import TitleInput from "./modalParts/TitleInput";


type AddQuestionModalProps = {
  onSave: (newQuestion: Question) => Promise<void>;
  setOpen: (open: boolean) => void;
  open: boolean;
};

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  onSave,
  setOpen,
  open,
}) => {
  const [newQuestion, setNewQuestion] = useState<Question>(initialQuestion);
  const { setError } = useError();
  const [blank, setBlank] = useState(true);
  const [testcases, setTestCases] = useState<TestCase[]>([initialTestCase]);
  const handleAddTestCase = () => {
    setTestCases([
      ...testcases,
      initialTestCase
    ]);
  };
  const handleInputChange = (index: number, inputValue: string) => {
    const updatedTestCases = [...testcases];
    updatedTestCases[index].input = inputValue;
    setTestCases(updatedTestCases);
  };

  const handleOutputChange = (index: number, outputValue: string) => {
    const updatedTestCases = [...testcases];
    updatedTestCases[index].output = outputValue;
    setTestCases(updatedTestCases);
  };

  const {
    value,
    valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  } = useInput((s: string) => s.trim().length > 0);
  const handleAddQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedQuestion = {
      ...newQuestion,
      testcases,
    };

    setNewQuestion(updatedQuestion);
    await onSave(updatedQuestion)
      .then(() => {
        setNewQuestion(initialQuestion);
        reset();
        setOpen(false);
      })
      .catch((e) => {
        setError(e);
      });
  };


  return (
    <>
      <Modal title="Add Question" setOpen={setOpen} open={open}>
        <form onSubmit={handleAddQuestion}>
          <div className="space-y-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <TitleInput
                hasError={hasError}
                value={value}
                valueChangeHandler={valueChangeHandler}
                inputBlurHandler={inputBlurHandler}
                newQuestion={newQuestion}
                setNewQuestion={setNewQuestion}
              />

              <div className="col-span-full">
                <legend className="block text-sm font-semibold leading-6 text-gray-900">
                  Description
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Markdown is supported
                </p>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-3">
                  <article className="prose max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkMath]}>
                      {newQuestion.description}
                    </ReactMarkdown>
                  </article>
                </div>
              </div>
            </div>
            {/* For Complexity */}
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
                    <div
                      className="flex items-center gap-x-3"
                      key={complexityOption}
                    >
                      <input
                        id={`complexity${complexityOption}`}
                        name="complexity"
                        value={complexityOption}
                        type="radio"
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
            {/* For Catergories */}
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
                                categories: [
                                  ...newQuestion.categories,
                                  category,
                                ],
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

            <TestCases
              testcases={testcases}
              setTestCases={setTestCases}
              handleInputChange={handleInputChange}
              handleOutputChange={handleOutputChange}
              handleAddTestCase={handleAddTestCase}
              blank={blank}
              setBlank={setBlank}
            />
          </div>
          <div className="border-b border-gray-900/10 pb-12" />
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => {
                setOpen(false);
                reset();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!valueIsValid || blank}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default AddQuestionModal;
