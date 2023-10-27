type PanelHeaderProps = {
  isSubmissionActive: boolean;
  handleSubmissionClick: () => void;
  handleDescriptionClick: () => void;
};

const PanelHeader: React.FC<PanelHeaderProps> = ({
  isSubmissionActive,
  handleSubmissionClick,
  handleDescriptionClick,
}) => {
  return (
    <div className="flex h-11 w-full items-center pt-2 dark:text-white overflow-hidden dark:bg-gray-950 ml-2">
      <div
        onClick={() => handleDescriptionClick()}
        className="flex flex-col h-full justify-center rounded-t-[5px] py-[10px] px-3 dark:bg-gray-800 bg-slate-100 text-xs cursor-pointer relative transition-all"
      >
        Description
      </div>
      {!isSubmissionActive && (
        <>
          <div>Description active</div>
          <hr className="bg-gray-700 dark:bg-dark-gray-700 absolute -bottom-[1px] right-0 h-[2px] w-full" />
        </>
      )}
      <div
        onClick={() => handleSubmissionClick()}
        className="flex flex-col h-full justify-center rounded-t-[5px] py-[10px] px-3 dark:bg-gray-800 bg-slate-100 text-xs cursor-pointer relative transition-all"
      >
        Submission
      </div>
      {isSubmissionActive && (
        <>
          <div>Submission active</div>
          <hr className="bg-gray-700 dark:bg-dark-gray-700 absolute -bottom-[1px] right-0 h-[2px] w-full" />
        </>
      )}
    </div>
  );
};

export default PanelHeader;
