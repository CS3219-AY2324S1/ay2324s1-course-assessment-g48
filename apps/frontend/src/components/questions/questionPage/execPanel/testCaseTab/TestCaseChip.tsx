import { Status } from "@/utils/enums/Status";

type TestCaseChipProps = {
  testNum: number | null;
  onClick: () => void;
  outputDetails: any;
};

const TestCaseChip: React.FC<TestCaseChipProps> = ({
  testNum,
  onClick,
  outputDetails,
}) => {
  let chipColor =
    "bg-slate-100 hover:bg-slate-200 dark:bg-neutral-700 dark:hover:bg-neutral-600";
  if (outputDetails?.status?.id) {
    if (outputDetails.status?.id === Status.Accepted) {
      chipColor = "bg-green-600 hover:bg-green-500";
    } else {
      // Any other status other than accepted
      chipColor = "bg-red-600 hover:bg-red-500";
    }
  }

  return (
    <div onClick={onClick} className="mr-2 items-start mt-2 dark:text-white">
      <div className="flex flex-wrap items-center gap-y-4">
        <div
          className={`font-medium items-center transition-all focus:outline-none inline-flex ${chipColor} relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap`}
        >
          Case {testNum}
        </div>
      </div>
    </div>
  );
};
export default TestCaseChip;
