import React from "react";

type TestCaseBoxProps = {
  title: string;
  content: string;
};

const TestCaseBox: React.FC<TestCaseBoxProps> = ({ title, content }) => {
  return (
    <div className="font-semibold">
      <p className="text-sm font-medium mt-4 dark:text-white">{title}</p>
      <div
        className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-slate-100 
    border-transparent text-white font-normal text-sm mt-2 transition-all 
    overflow-y-auto dark:bg-neutral-700"
      >
        <pre>{content}</pre>
      </div>
    </div>
  );
};
export default TestCaseBox;
