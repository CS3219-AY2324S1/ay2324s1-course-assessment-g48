import { useEffect, useRef, useState } from "react";
import useInput from "../../../hook/useInput";
import {
  Question,
  initialQuestion,
} from "../../../database/question/entities/question.entity";
import Modal from "../../Modal";
import { useError } from "@/hook/ErrorContext";
import TestCasesInput from "./modalParts/TestCasesInput";
import TitleInput from "./modalParts/TitleInput";
import DescriptionInput from "./modalParts/DescriptionInput";
import ComplexityInput from "./modalParts/ComplexityInput";
import CategoriesInput from "./modalParts/CategoriesInput";
import StarterCodeInput from "./modalParts/StarterCodeInput";
import ExamplesInput from "./modalParts/ExamplesInput";
import FollowUpInput from "./modalParts/FollowUpInput";
import ConstraintsInput from "./modalParts/ConstraintsInput";

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
          examples: [],
          testcases: [],
          constraints: "",
          followUp: "",
          starterCode: [],
          dateCreated: new Date(),
        });
        reset();
        setOpen(false);
      })
      .catch((e) => {
        setError({
          type: 1,
          message: e,
        });
      });
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideModalClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setNewQuestion({
          _id: "",
          title: "",
          description: "",
          categories: [],
          complexity: "",
          examples: [],
          testcases: [],
          constraints: "",
          followUp: "",
          starterCode: [],
          dateCreated: new Date(),
        });
      }
    }
    document.addEventListener("mousedown", handleOutsideModalClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideModalClick);
    };
  }, [ref]);

  return (
    <Modal title="Add Question" setOpen={setOpen} open={open}>
      <form onSubmit={handleAddQuestion}>
        <div ref={ref}>
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

            <ExamplesInput
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
            />

            <ConstraintsInput
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
            />

            <FollowUpInput
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
            />

            <StarterCodeInput
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
            />

            <TestCasesInput
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
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
                setNewQuestion({
                  _id: "",
                  title: "",
                  description: "",
                  categories: [],
                  complexity: "",
                  examples: [],
                  testcases: [],
                  constraints: "",
                  followUp: "",
                  starterCode: [],
                  dateCreated: new Date(),
                });
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
        </div>
      </form>
    </Modal>
  );
};
export default AddQuestionModal;
