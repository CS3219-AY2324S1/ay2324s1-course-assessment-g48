import { Question } from "@/database/question/entities/question.entity";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type QuestionPaginationProps = {
  hidden?: boolean;
  numberOfPages: number;
  totalQuestionsNum: number;
  questionsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const QuestionPagination: React.FC<QuestionPaginationProps> = ({
  hidden,
  numberOfPages,
  totalQuestionsNum,
  questionsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:bg-gray-700"
      hidden={hidden}
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{questionsPerPage}</span> of{" "}
            <span className="font-medium">{totalQuestionsNum}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex space-x-2 rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <input
              className="border rounded py-1 px-2 text-center w-16"
              type="number"
              min="1"
              max={totalQuestionsNum}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target && typeof event.target.value === 'string') {
                  setCurrentPage(Number(event.target.value));
                }
              }}
            />
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default QuestionPagination;
