import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Modal from "../Modal";
import { Complexity } from "@/utils/enums/Complexity";

type ViewQuestionModalProps = {
  onViewQuestion: {
    _id: string;
    title: string;
    description: string;
    categories: string[];
    complexity: string;
  };
  setOpen: (open: boolean) => void;
  open: boolean;
};

const ViewQuestionModal: React.FC<ViewQuestionModalProps> = ({
  onViewQuestion,
  setOpen,
  open,
}) => {
  return (
    <Modal title={onViewQuestion.title} setOpen={setOpen} open={open}>
      <div className="space-y-12">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-3">
              <article className="prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {onViewQuestion.description}
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
              <div className="mt-3">
              <span className={`inline-flex items-center rounded-md ${onViewQuestion.complexity === Complexity.Medium ? "bg-yellow-50 text-yellow-800 ring-yellow-600/20" : onViewQuestion.complexity === Complexity.Easy ? "bg-green-50 text-green-700 ring-green-600/20" : "bg-red-50 text-red-700 ring-red-600/10"} px-2 py-1 text-sm font-medium ring-1 ring-inset `}>
                {onViewQuestion.complexity}
              </span>
              </div>
            </fieldset>
          </div>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Categories
              </legend>
              <div className="space-y-3 space-x-1">
                {onViewQuestion.categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center  px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-indigo-100 text-indigo-800"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};
export default ViewQuestionModal;
