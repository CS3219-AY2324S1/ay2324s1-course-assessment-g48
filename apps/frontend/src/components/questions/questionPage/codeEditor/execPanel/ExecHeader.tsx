type ExecHeaderProps = {
  handleResultClick: () => void;
  handleTestCasesClick: () => void;
  isResultActive: boolean;
};

const ExecHeader: React.FC<ExecHeaderProps> = ({
  handleResultClick,
  handleTestCasesClick: handleTestCaseClick,
  isResultActive,
}) => {
  return (
    <>
      <div className="flex h-10 items-center space-x-6">
        <div
          onClick={() => handleTestCaseClick()}
          className="flex flex-col h-full justify-center cursor-pointer relative "
        >
          <div className="text-sm font-medium leading-5 dark:text-white">
            Test Cases
          </div>
          {!isResultActive && (
            <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-black dark:bg-white" />
          )}
        </div>
        <div
          onClick={() => handleResultClick()}
          className="flex flex-col h-full justify-center cursor-pointer relative "
        >
          <div className="text-sm font-medium leading-5 dark:text-white">
            Result
          </div>
          {isResultActive && (
            <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-black dark:bg-white" />
          )}
        </div>
      </div>
    </>
  );
};
export default ExecHeader;
