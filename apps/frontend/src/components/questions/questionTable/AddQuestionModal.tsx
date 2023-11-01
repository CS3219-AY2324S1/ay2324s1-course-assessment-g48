import { useState } from "react";
import useInput from "../../../hook/useInput";
import {
  Question,
  TestCase,
  initialQuestion,
  initialTestCase,
} from "../../../database/question/entities/question.entity";
import Modal from "../../Modal";
import { useError } from "@/hook/ErrorContext";
import TestCasesInput from "./modalParts/TestCasesInput";
import TitleInput from "./modalParts/TitleInput";
import DescriptionInput from "./modalParts/DescriptionInput";
import ComplexityInput from "./modalParts/ComplexityInput";
import CategoriesInput from "./modalParts/CategoriesInput";

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
  const [testCases, setTestCases] = useState<TestCase[]>([initialTestCase]);
  const handleAddTestCase = () => {
    // TODO: not sure why initialTestCase is mutated
    setTestCases([...testCases, {
      input: "",
      output: "",
    }]);
  };
  const handleInputChange = (index: number, inputValue: string) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index].input = inputValue;
    setTestCases(updatedTestCases);
  };

  const handleOutputChange = (index: number, outputValue: string) => {
    const updatedTestCases = [...testCases];
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
      testcases: testCases,
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

            <DescriptionInput
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
            />
          </div>

          <ComplexityInput
            newQuestion={newQuestion}
            setNewQuestion={setNewQuestion}
          />

          <CategoriesInput
            newQuestion={newQuestion}
            setNewQuestion={setNewQuestion}
          />

          <TestCasesInput
            testcases={testCases}
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
  );
};
export default AddQuestionModal;
