import { classnames } from "@/utils/classnames/classnames";

type RunProps = {
  userCode: string;
  processing: boolean;
  handleCompile: () => void;
};

const Run: React.FC<RunProps> = ({ userCode, processing, handleCompile }) => {
  return (
    <>
      {/*onClick={handleCompile} to be added */}
      <button
        onClick={handleCompile}
        disabled={!userCode}
        className={classnames(
          "px-3 py-1.5 font-medium items-center transition-all inline-flex text-sm dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 rounded-lg",
          !userCode ? "opacity-50" : ""
        )}
      >
        {processing ? "Processing" : "Run"}
      </button>
    </>
  );
};

export default Run;
