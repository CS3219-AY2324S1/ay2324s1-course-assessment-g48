import React from "react";

type InputOutputProps = {
  inputText: string;
  outputText: string;
};

const InputOutput: React.FC<InputOutputProps> = ({
  inputText,
  outputText,
}) => {
  return (
    <div className="font-semibold mb-12">
      <p className="text-sm font-medium mt-4 dark:text-white">Input: </p>
      <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-slate-100 dark:bg-neutral-700 border-transparent dark:text-white mt-2 transition-all">
        {inputText}
      </div>
      <p className="text-sm font-medium mt-4 dark:text-white">Output: </p>
      <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-slate-100 dark:bg-neutral-700 border-transparent dark:text-white mt-2 transition-all">
        {outputText}
      </div>
    </div>
  );
};
export default InputOutput;
