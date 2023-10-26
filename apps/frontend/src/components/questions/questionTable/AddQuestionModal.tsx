import { Fragment, useState, useEffect } from "react";
import { Complexity } from "../../../utils/enums/Complexity";
import { Category } from "../../../utils/enums/Category";
import useInput from "../../../hook/useInput";
import ReactMarkdown from "react-markdown";
import { Question, TestCase } from "../../../database/question/entities/question.entity";
import Modal from "../../Modal";
import { Tab } from "@headlessui/react";
import { PlusSmallIcon, XMarkIcon } from "@heroicons/react/24/outline";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { useError } from "@/hook/ErrorContext";

function classNames(...classes: any[]) {
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
    testcases: [],
    constraints: "",
    followUp: "",
    starterCode: "",
    dateCreated: new Date(),
  });
  const { setError } = useError();
  const [blank, setBlank] = useState(true);
  const [testcases, setTestCases] = useState<TestCase[]>([
    {
      number: 1,
      input: "",
      output: "",
    },
  ]);
  const handleAddTestCase = () => {
    setTestCases([
      ...testcases,
      {
        number: -1,
        input: "",
        output: "",
      },
    ]);
  }
  const handleInputChange = (index:number, inputValue:string) => {
    const updatedTestCases = [...testcases];
    updatedTestCases[index].input = inputValue;
    setTestCases(updatedTestCases);
  };

  const handleOutputChange = (index:number, outputValue:string) => {
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
    const indexedTestCases = testcases.map((testCase, index) => {
      return {
        ...testCase,
        number: index+1,
      };
    });

    const updatedQuestion = {
      ...newQuestion,
      testcases: indexedTestCases
    };

    setNewQuestion(updatedQuestion);
    await onSave(updatedQuestion)
      .then(() => {
        setNewQuestion({
          _id: "",
          title: "",
          description: "",
          categories: [],
          complexity: "",
          testcases: [],
          constraints: "",
          followUp: "",
          starterCode: "",
          dateCreated: new Date(),
        });
        reset();
        setOpen(false);
      })
      .catch((e) => {
        setError(e);
      });
  };

  useEffect(() => {
    testcases.filter((item) => item.input === "" || item.output === "").length > 0 ? setBlank(true) : setBlank(false);
  }, [testcases]);

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
                      className="block ml-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
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
                    <ReactMarkdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
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

            <div className="mt-10">
              <div className="flex items-center justify-between">
                <div>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Test Cases
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Add test cases for the question
                  </p>
                </div>
                <button className="relative rounded-full bg-indigo-600 p-1 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  onClick={handleAddTestCase}
                type="button">
                  <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex space-x-8 px-2 overflow-x-auto scrollbar-hidden">
                    {testcases.map((testcase, index) => (
                      <Tab
                        key={index}
                        className={({ selected }) =>
                          classNames(
                            selected
                              ? "border-indigo-600 text-indigo-600"
                              : "border-transparent text-gray-900",
                            "flex-0 whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                          )
                        }
                      >
                        Test Case {index+1}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {testcases.map((testcase, index) => (
                    <Tab.Panel
                      key={index}
                      className="space-y-5 px-4 pb-8 pt-5"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                        <div>
                        <legend className="block text-sm font-semibold leading-6 text-gray-900">
                          Input
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          i.e Array: [1,2,3]
                          </p>
                          </div>
                          <button className="relative rounded-full bg-red-600 p-1 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                            type="button"
                            onClick={() => {
                              if (testcases.length === 1) {
                                setTestCases([
                                  {
                                    number: 1,
                                    input: "",
                                    output: "",
                                  },
                                ]);
                              } else {
                                setTestCases(testcases.filter((item) => item !== testcase));
                              }
                            }}>
                            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        <div
                          className={`mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset
                            focus-within:ring-indigo-600 sm:max-w-full`}
                        >
                          <input
                            className="ml-2 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                            type="text"
                            name="input"
                            value={testcase.input}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <legend className="block text-sm font-semibold leading-6 text-gray-900">
                          Output
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          i.e Array: [1,2,3]
                        </p>
                        <div
                          className={`mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset
                            focus-within:ring-indigo-600 sm:max-w-full`}
                        >
                          <input
                            className="ml-2 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                            type="text"
                            name="output"
                            value={testcase.output}
                            onChange={(e) => handleOutputChange(index, e.target.value)}
                          />
                        </div>
                      </div>
                      
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
                {blank ? (
                  <label className="ml-5 mt-1 text-sm leading-6 text-red-600">
                    Test case cannot be empty.
                  </label>) : <></>}
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
