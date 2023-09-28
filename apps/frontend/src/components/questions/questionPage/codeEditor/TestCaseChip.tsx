import React from 'react';

type TestCaseChipProps = {
  testNum: number;
};

const TestCaseChip:React.FC<TestCaseChipProps> = ({ testNum }) => {
  
  return <div className="mr-2 items-start mt-2 dark:text-white">
  <div className="flex flex-wrap items-center gap-y-4">
    <div className="font-medium items-center transition-all focus:outline-none inline-flex dark:bg-neutral-700 dark:hover:bg-neutral-600 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
      Case {testNum}
    </div>
  </div>
</div>
}
export default TestCaseChip;