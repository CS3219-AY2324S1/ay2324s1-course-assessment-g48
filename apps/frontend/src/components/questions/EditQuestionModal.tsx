import useQuestion from "@/hook/useQuestion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Question } from "../../../type/Question";
import { Complexity } from "@/utils/enums/Complexity";
import { Category } from "@/utils/enums/Category";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

type EditQuestionModalProps = {
    onEditQuestion: {_id: string, title: string, description: string, categories: string[], complexity: string}
    onUpdate: (newQuestion: Question) => Promise<void>
    setOpen: (open: boolean) => void;
    open: boolean;
};

const EditQuestionModal: React.FC<EditQuestionModalProps>  = ({
  onEditQuestion, onUpdate, setOpen, open
}) => {
  const [newQuestion, setNewQuestion] = useState<Question>(onEditQuestion);
  const [error, setError] = useState<string>("");

  const handleEditQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onUpdate(newQuestion)
    .then(() => {
      setError("")
      setOpen(false)
    })
    .catch(e => {
      setError(e)
    })
  };

  useEffect(() => {
    setNewQuestion(onEditQuestion)
  }, [onEditQuestion])
  return (
    <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {onEditQuestion.title}
                      </Dialog.Title>
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
                                  value = {newQuestion.description}
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
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
                                  {Object.values(Complexity).map(
                                    (complexityOption) => (
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
                                          checked={
                                            newQuestion.complexity ===
                                            complexityOption
                                          }
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
                                    )
                                  )}
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
                                    <div
                                      className="relative flex gap-x-3"
                                      key={category}
                                    >
                                      <div className="flex h-6 items-center">
                                        <input
                                          id={`${category}`}
                                          name="catergory"
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                          checked={newQuestion.categories.includes( category)}
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
                                                categories:
                                                  newQuestion.categories.filter(
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
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
  );
};
export default EditQuestionModal;