import { Status } from "@/utils/enums/Status";
import OutputBox from "./OutputBox";

type OutputWindowProps = {
  outputDetails: any;
};

const OutputWindow: React.FC<OutputWindowProps> = ({ outputDetails }) => {
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
  return (
    <>
      <p className="text-lg font-medium mt-4 dark:text-white">OutputWindow:</p>
      <div className="space-y-4">
        <OutputBox title="Your input:" content={"input content"} />
        <OutputBox title="Output:" content={getOutput()} />
        <OutputBox title="Expected Output:" content={"expected output"} />
      </div>
    </>
  );
};

export default OutputWindow;
