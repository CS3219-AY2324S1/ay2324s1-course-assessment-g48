import React from "react";


const TestCasesHeader = () => {
  return (
    <div className="flex h-10 items-center space-x-6">
      <div className="flex flex-col h-full justify-center cursor-pointer relative ">
        <div className="text-sm font-medium leading-5 dark:text-white">
          Test Cases
        </div>
        <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-black dark:bg-white" />
      </div>
      
    </div>
  );
};
export default TestCasesHeader;
