import {
  TestCase,
  initialTestCase,
} from "@/database/question/entities/question.entity";
import { classNames } from "@/utils/classnames/classnames";
import { Tab } from "@headlessui/react";
import { PlusSmallIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useEffect } from "react";

type TestCasesInputProps = {
  testcases: TestCase[];
  setTestCases: (testcases: TestCase[]) => void;
  handleAddTestCase: () => void;
  handleInputChange: (index: number, value: string) => void;
  handleOutputChange: (index: number, value: string) => void;
  blank: boolean;
  setBlank: (blank: boolean) => void;
};

const TestCasesInput: React.FC<TestCasesInputProps> = ({
  testcases,
  setTestCases,
  handleAddTestCase,
  handleInputChange,
  handleOutputChange,
  blank,
  setBlank,
}) => {
  useEffect(() => {
    setBlank(testcases.filter((item) => item.input === "" || item.output === "").length > 0);
  }, [testcases, setBlank]);

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
          <Tab.List className="-mb-px flex space-x-8 px-3 overflow-x-auto scrollbar-hidden">
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
                Test Case {index + 1}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels as={Fragment}>
          {testcases.map((testcase, index) => (
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
                      if (testcases.length === 1) {
                        setTestCases([initialTestCase]);
                      } else {
                        setTestCases(
                          testcases.filter((item) => item !== testcase)
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
                  <input
                    className="ml-2 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                    type="text"
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
