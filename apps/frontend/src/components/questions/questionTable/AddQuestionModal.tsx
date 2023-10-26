import { useState } from "react";
import { Complexity } from "../../../utils/enums/Complexity";
import { Category } from "../../../utils/enums/Category";
import useInput from "../../../hook/useInput";
import ReactMarkdown from "react-markdown";
import { Question } from "../../../database/question/entities/question.entity";
import Modal from "../../Modal";
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'

const navigation = {
  categories: [
    {
      name: "Test Case 1"
    },
    {
      name: "Test Case 2"
    },
    {
      name: "Test Case 3"
    },
    {
      name: "Test Case 4"
    },
    {
      name: "Test Case 5"
    }
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

function classNames(...classes:any[]) {
  return classes.filter(Boolean).join(" ");
}

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
  const [newQuestion, setNewQuestion] = useState<Question>({
    _id: "",
    title: "",
    description: "",
    categories: [],
    complexity: "",
  });
  const [error, setError] = useState<string>("");
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
    await onSave(newQuestion)
      .then(() => {
        setNewQuestion({
          _id: "",
          title: "",
          description: "",
          categories: [],
          complexity: "",
        });
        reset();
        setError("");
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
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                      value={value}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        valueChangeHandler(event);
                        setNewQuestion({
                          ...newQuestion,
                          title: event.target.value,
                        });
                      }}
                      onBlur={inputBlurHandler}
                    />
                  </div>
                  {hasError && value.trim().length <= 0 ? (
                    <label className="mt-1 text-sm leading-6 text-red-600">
                      Input cannot be empty.
                    </label>
                  ) : null}
                </div>
              </div>

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
                    <ReactMarkdown>{newQuestion.description}</ReactMarkdown>
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

            <div className="mt-10">
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Test Cases
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Add test cases for the question
              </p>
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8 px-2 overflow-x-auto scrollbar-hidden">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "border-indigo-600 text-indigo-600"
                              : "border-transparent text-gray-900",
                            "flex-0 whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
              </Tab.Group>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12" />
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => {
                setOpen(false);
                reset();
                setError("");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!valueIsValid}
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
