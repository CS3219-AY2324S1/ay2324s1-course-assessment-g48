import { useEffect, useState } from "react";
import {
  Question,
} from "@/database/question/entities/question.entity";
import Modal from "@/components/Modal";
import DescriptionInput from "./modalParts/DescriptionInput";
import ComplexityInput from "./modalParts/ComplexityInput";
import CategoriesInput from "./modalParts/CategoriesInput";
import TestCasesInput from "./modalParts/TestCasesInput";
import StarterCodeInput from "./modalParts/StarterCodeInput";
import ExamplesInput from "./modalParts/ExamplesInput";
import ConstraintsInput from "./modalParts/ConstraintsInput";
import FollowUpInput from "./modalParts/FollowUpInput";

type EditQuestionModalProps = {
  onEditQuestion: Question;
  onUpdate: (newQuestion: Question) => Promise<void>;
  setOpen: (open: boolean) => void;
  open: boolean;
};

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  onEditQuestion,
  onUpdate,
  setOpen,
  open,
}) => {
  const [newQuestion, setNewQuestion] = useState<Question>(onEditQuestion);
  const [, setError] = useState<string>("");
  const [blank, setBlank] = useState(true);
  const handleEditQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onUpdate(newQuestion)
      .then(() => {
        setError("");
        setOpen(false);
      })
      .catch((e) => {
        setError(e);
      });
  };

  useEffect(() => {
    setNewQuestion(onEditQuestion);
  }, [onEditQuestion]);

  return (
    <Modal title={onEditQuestion.title} setOpen={setOpen} open={open}>
      <form onSubmit={handleEditQuestion}>
        <div className="space-y-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <DescriptionInput
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
            />
          </div>

          <div className="border-b border-gray-900/10 pb-12">
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
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => {
              setOpen(false);
              setError("");
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={blank}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Confirm
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default EditQuestionModal;
