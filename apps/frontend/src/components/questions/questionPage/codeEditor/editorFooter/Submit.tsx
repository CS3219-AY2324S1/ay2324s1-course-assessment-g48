import { classnames } from "@/utils/classnames/classnames";

type SubmitProps = {
  userCode: string;
  processing: boolean;
};

const Submit: React.FC<SubmitProps> = ({ userCode, processing }) => {
  return (
    // disabled={true} to be removed
    <button
      disabled={true}
      className={classnames(
        "px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm dark:text-white dark:bg-green-600 dark:hover:bg-green-500 text-white bg-green-600 hover:bg-green-500 rounded-lg",
        !userCode ? "opacity-50" : "opacity-50"
      )}
    >
      {"Submit"}
    </button>
  );
};

export default Submit;
