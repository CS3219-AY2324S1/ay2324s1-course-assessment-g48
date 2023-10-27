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
            : null}
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
      // runtime error (id: 7, 8, 9, 10, 11, 12)
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };
  return (
    <>
      <p className="text-sm font-medium mt-4 dark:text-white">OutputWindow:</p>
      <div className="w-full h-56 rounded-lg border px-3 py-[10px] bg-slate-100 border-transparent text-white font-normal text-sm mt-2 transition-all overflow-y-auto dark:bg-neutral-700">
        {outputDetails ? <>{getOutput()}</> : null}
        <pre>this is a test</pre>
      </div>
    </>
  );
};

export default OutputWindow;
