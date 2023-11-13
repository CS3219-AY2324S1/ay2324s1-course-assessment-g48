import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react'

type Props = {
  hidden?: boolean;
  sessionsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  indexOfFirstRecord: number;
  indexOfLastRecord: number;
  numberOfSession: number
};

export default function SessionPagination({ 
    hidden,
    sessionsPerPage,
    currentPage,
    setCurrentPage,
    indexOfFirstRecord,
  indexOfLastRecord,
    numberOfSession
}: Props) {
    const [pageNumber, setPageNumber] = useState<string>("1");

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && pageNumber !== "") {
        setCurrentPage(parseInt(pageNumber, 10));
      }
    };

    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
      setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
      setPageNumber(currentPage.toString());
      console.log(indexOfLastRecord)
    }, [currentPage]);

    if (hidden) return <></>;
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:bg-gray-700 rounded-b-lg">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium">{indexOfFirstRecord + 1}</span> to{" "}
            <span className="font-medium">{indexOfLastRecord}</span> of
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex space-x-2 rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100 disabled:dark:bg-gray-500 disabled:dark:ring-gray-700"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <div
              className="border rounded py-1 px-2 text-center w-16 dark:bg-gray-200 dark:text-gray-800"
              style={{ display: "inline-block" }} // Add this style to make it a block element
            >
              {pageNumber}
            </div>
            <button
              disabled={numberOfSession < 10}
              onClick={handleNextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-100 disabled:dark:bg-gray-500 disabled:dark:ring-gray-700"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}