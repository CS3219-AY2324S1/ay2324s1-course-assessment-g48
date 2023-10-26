import ReactMarkdown from "react-markdown";
import { Complexity } from "@/utils/enums/Complexity";
import { Category } from "@/utils/enums/Category";
import { useEffect, useState } from "react";
import { Question, TestCase } from "@/database/question/entities/question.entity";
import Modal from "@/components/Modal";

type EditQuestionModalProps = {
  onEditQuestion: {
    _id: string;
    title: string;
    description: string;
    categories: string[];
    complexity: string;
    testcases: TestCase[];
  };
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
  const [error, setError] = useState<string>("");

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
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Markdown is supported
              </p>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={newQuestion.description}
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
                  <ReactMarkdown>
                    {newQuestion.description}
                  </ReactMarkdown>
                </article>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
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
                        checked={newQuestion.complexity === complexityOption}
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

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  Categories
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose the categories of the question
                </p>
                <div className="mt-6 space-y-6">
                  {Object.values(Category).map((category) => (
                    <div className="relative flex gap-x-3" key={category}>
                      <div className="flex h-6 items-center">
                        <input
                          id={`${category}`}
                          name="catergory"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          checked={newQuestion.categories.includes(category)}
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
