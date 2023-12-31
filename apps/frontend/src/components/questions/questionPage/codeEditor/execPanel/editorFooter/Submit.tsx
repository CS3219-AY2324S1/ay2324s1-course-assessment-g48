import { classNames } from "@/utils/classnames/classnames";

type SubmitProps = {
  userCode: string;
  processing: boolean;
  handleCompile: () => void;
};

const Submit: React.FC<SubmitProps> = ({
  userCode,
  processing,
  handleCompile,
}) => {
  return (
    <button
      onClick={handleCompile}
      disabled={!userCode}
      className={classNames(
        "px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm dark:text-white dark:bg-green-600 dark:hover:bg-green-500 text-white bg-green-600 hover:bg-green-500 rounded-lg",
        !userCode ? "opacity-50" : ""
      )}
    >
      {processing ? "Processing" : "Submit"}
    </button>
  );
};

export default Submit;
