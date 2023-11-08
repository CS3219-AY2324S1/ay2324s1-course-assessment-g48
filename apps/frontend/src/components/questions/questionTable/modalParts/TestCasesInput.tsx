import {
  Question,
  TestCase,
  emptyTestCase,
} from "@/database/question/entities/question.entity";
import { useHorizontalScroll } from "@/hook/useHorizontalScroll";
import { classNames } from "@/utils/classnames/classnames";
import { Tab } from "@headlessui/react";
import { PlusSmallIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useState } from "react";

type TestCasesInputProps = {
  newQuestion: Question;
  setNewQuestion: (question: Question) => void;
  blank: boolean;
  setBlank: (blank: boolean) => void;
};

const TestCasesInput: React.FC<TestCasesInputProps> = ({
  newQuestion,
  setNewQuestion,
  blank,
  setBlank,
}) => {
  const scrollRef = useHorizontalScroll();
  const [currTestCases, setCurrTestCases] = useState<TestCase[]>([emptyTestCase]);

  useEffect(() => {
    setCurrTestCases(newQuestion.testcases.length === 0 ? [emptyTestCase] : newQuestion.testcases);
  }, [newQuestion, setCurrTestCases]);

  useEffect(() => {
    setBlank(
      currTestCases.filter((item) => item.input === "" || item.output === "")
        .length > 0
    );
  }, [currTestCases, setBlank]);

  const handleAddTestCase = () => {
    // TODO: not sure why initialTestCase is mutated
    setCurrTestCases([
      ...currTestCases,
      {
        input: "",
        output: "",
      },
    ]);
  };
  const handleInputChange = (index: number, inputValue: string) => {
    const updatedTestCases = [...currTestCases];
    updatedTestCases[index].input = inputValue;
    setCurrTestCases(updatedTestCases);
    setNewQuestion({
      ...newQuestion,
      testcases: updatedTestCases,
    });
  };

  const handleOutputChange = (index: number, outputValue: string) => {
    const updatedTestCases = [...currTestCases];
    updatedTestCases[index].output = outputValue;
    setCurrTestCases(updatedTestCases);
    setNewQuestion({
      ...newQuestion,
      testcases: updatedTestCases,
    });
  };
  
  return (
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
        <button
          className="relative rounded-full bg-indigo-600 p-1 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          onClick={handleAddTestCase}
          type="button"
        >
          <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Tab.Group as="div" className="mt-2">
        <div className="border-b border-gray-200">
          <Tab.List
            ref={scrollRef}
            className="-mb-px flex space-x-8 py-1 overflow-x-auto"
          >
            {currTestCases.map((testcase, index) => (
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
                Test Case {index + 1}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels as={Fragment}>
          {currTestCases.map((testcase, index) => (
            <Tab.Panel key={index} className="space-y-5 px-4 pb-8 pt-5">
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
                  <button
                    className="relative rounded-full bg-red-600 p-1 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    type="button"
                    onClick={() => {
                      if (currTestCases.length === 1) {
                        setCurrTestCases([
                          {
                            input: "",
                            output: "",
                          },
                        ]);
                      } else {
                        setCurrTestCases(
                          currTestCases.filter((item) => item !== testcase)
                        );
                      }
                    }}
                  >
                    <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <div
                  className={`mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset
                focus-within:ring-indigo-600 sm:max-w-full`}
                >
                  <textarea
                    className="ml-2 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
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
                  <textarea
                    className="ml-2 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                    value={testcase.output}
                    onChange={(e) => handleOutputChange(index, e.target.value)}
                  />
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
        {blank && (
          <label className="ml-5 mt-1 text-sm leading-6 text-red-600">
            Test case cannot be empty.
          </label>
        )}
      </Tab.Group>
    </div>
  );
};
export default TestCasesInput;
