import {
  Question,
} from "@/database/question/entities/question.entity";
import { classNames } from "@/utils/classnames/classnames";
import { Tab } from "@headlessui/react";
import { PlusSmallIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";

type ExamplesInputProps = {
  newQuestion: Question;
  setNewQuestion: (question: Question) => void;
};

const ExamplesInput: React.FC<ExamplesInputProps> = ({
  newQuestion,
  setNewQuestion,
}) => {
  const [currExamples, setCurrExamples] = useState<string[]>([""]);

  useEffect(() => {
    setCurrExamples(newQuestion.examples.length === 0 ? [""] : newQuestion.examples);
  }, [newQuestion, setCurrExamples]);

  const handleAddExample = () => {
    // TODO: not sure why initialTestCase is mutated
    setCurrExamples([
      ...currExamples,
      ""
    ]);
  };
  const handleExampleChange = (index: number, exampleValue: string) => {
    const updatedExamples = [...currExamples];
    updatedExamples[index] = exampleValue;
    setCurrExamples(updatedExamples);
    setNewQuestion({
      ...newQuestion,
      examples: updatedExamples,
    });
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div>
          <legend className="text-sm font-semibold leading-6 text-gray-900">
            Examples
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Add examples for the question
          </p>
        </div>
        <button
          className="relative rounded-full bg-indigo-600 p-1 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
          onClick={handleAddExample}
          type="button"
        >
          <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Tab.Group as="div" className="mt-2">
        <div className="border-b border-gray-200">
          <Tab.List
            className="-mb-px flex space-x-8 py-1 overflow-x-auto"
          >
            {currExamples.map((example, index) => (
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
                Example {index + 1}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels as={Fragment}>
          {currExamples.map((example, index) => (
            <Tab.Panel key={index} className="space-y-5 px-4 pb-8 pt-5">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <legend className="block text-sm font-semibold leading-6 text-gray-900">
                      Preview
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Markdown is supported
                    </p>
                  </div>
                  <button
                    className="relative rounded-full bg-red-600 p-1 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    type="button"
                    onClick={() => {
                      if (currExamples.length === 1) {
                        setCurrExamples([
                          "",
                        ]);
                      } else {
                        setCurrExamples(
                          currExamples.filter((item) => item !== example)
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
                    rows={8}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={example}
                    onChange={(e) => handleExampleChange(index, e.target.value)}
                  />
                </div>

                <div className="mt-3">
                  <article className="prose max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkMath]}>
                      {newQuestion.examples[index]}
                    </ReactMarkdown>
                  </article>
                </div>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default ExamplesInput;
