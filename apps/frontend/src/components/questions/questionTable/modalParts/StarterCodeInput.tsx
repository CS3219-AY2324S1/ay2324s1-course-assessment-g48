import { Question, StarterCode } from "@/database/question/entities/question.entity";
import { useHorizontalScroll } from "@/hook/useHorizontalScroll";
import { classNames } from "@/utils/classnames/classnames";
import { languageOptions } from "@/utils/constants/LanguageOptions";
import { Tab } from "@headlessui/react";
import { Editor } from "@monaco-editor/react";
import React, { Fragment } from "react";

type StarterCodeInputProps = {
  newQuestion: Question;
  setNewQuestion: (question: Question) => void;
};

const StarterCodeInput: React.FC<StarterCodeInputProps> = ({
  newQuestion,
  setNewQuestion
}) => {
  const scrollRef = useHorizontalScroll();
  const [currStarterCode, setCurrStarterCode] = React.useState<StarterCode[]>(newQuestion.starterCode);
  const handleStarterCodeChange = (languageId: number, value: string) => {
    const index = currStarterCode.findIndex((starterCode) => starterCode.languageId === languageId);
    if (index === -1) {
      console.log(`selectedLanguage ${languageId} not found.`);
      setCurrStarterCode([...currStarterCode, { languageId, code: value }]);
    } else {
      const updatedStarterCodes = [...currStarterCode];
      updatedStarterCodes[index].code = value;
      setCurrStarterCode(updatedStarterCodes);
    }

    setNewQuestion({
      ...newQuestion,
      starterCode: currStarterCode,
    })
  };
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div>
          <legend className="text-sm font-semibold leading-6 text-gray-900">
            Starter Codes
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Add starter code for different languages (Optional)
          </p>
        </div>
      </div>
      <Tab.Group as="div" className="mt-2">
        <div className="border-b border-gray-200">
          <Tab.List ref={scrollRef} className="-mb-px flex space-x-8 py-1 overflow-x-auto">
            {languageOptions.map((language) => (
              <Tab
                key={language.id}
                className={({ selected }) =>
                  classNames(
                    selected
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-900",
                    "flex-0 whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
                  )
                }
              >
                {language.label}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels as={Fragment}>
          {languageOptions.map((language) => (
            <Tab.Panel key={language.id} className="space-y-5 px-4 pb-8 pt-5">
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <legend className="block text-sm font-semibold leading-6 text-gray-900">
                      Preview
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      How the code will look like on an initial attempt
                    </p>
                  </div>
                </div>
                <Editor
                  height="40vh"
                  value={newQuestion.starterCode.find((starterCode) => starterCode.languageId === language.id)?.code}
                  theme={"light"}
                  onChange={(value) => handleStarterCodeChange(language.id, value!)}
                  language={language.value.toLowerCase()}
                />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default StarterCodeInput;
