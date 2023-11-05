import { Status } from "@/utils/enums/Status";
import OutputBox from "./OutputBox";

type OutputWindowProps = {
  outputDetails: any;
  expected_output: string;
};

const OutputWindow: React.FC<OutputWindowProps> = ({
  outputDetails,
  expected_output,
}) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === Status.CompilationError) {
      // compilation error (id: 6)
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === Status.Accepted) {
      // accepted (id: 3)
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : "Accepted"}
        </pre>
      );
    } else if (statusId === Status.WrongAnswer) {
      // wrong answer (id: 4)
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Wrong Answer`}
        </pre>
      );
    } else if (statusId === Status.TimeLimitExceeded) {
      // time limit exceeded (id: 5)
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      // runtime error (id: 7, 8, 9, 10, 11, 12) or have not submitted
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {outputDetails?.stderr !== undefined
            ? `${atob(outputDetails?.stderr)}`
            : ""}
        </pre>
      );
    }
  };
  console.log();
  return (
    <>
      <div className="space-y-4">
        <OutputBox
          title="Your input:"
          content={
            outputDetails?.stdin !== undefined ? atob(outputDetails.stdin) : ""
          }
        />
        {/* Todo: Add the tcs themselves itself */}
        <OutputBox title="Your Output:" content={getOutput()} />
        <OutputBox title="Expected Output:" content={expected_output} />
      </div>
    </>
  );
};

export default OutputWindow;
