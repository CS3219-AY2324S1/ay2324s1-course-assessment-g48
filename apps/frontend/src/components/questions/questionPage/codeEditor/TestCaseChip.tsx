type TestCaseChipProps = {
  testNum: number;
  onClick: () => void;
};

const TestCaseChip: React.FC<TestCaseChipProps> = ({ testNum, onClick }) => {
  return (
    <div onClick={onClick} className="mr-2 items-start mt-2 dark:text-white">
      <div className="flex flex-wrap items-center gap-y-4">
        <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-slate-100 hover:bg-slate-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap">
          Case {testNum}
        </div>
      </div>
    </div>
  );
};
export default TestCaseChip;
