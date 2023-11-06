type OutputMetricsProps = {
  outputDetails: any;
};

const OutputMetrics: React.FC<OutputMetricsProps> = ({ outputDetails }) => {
  function FormatRuntime(outputDetails: any) {
    if (outputDetails !== "" && !undefined && !null) {
      if (outputDetails.time < 1) {
        outputDetails.time = Number(outputDetails.time) * 1000 + " ms";
      } else {
        outputDetails.time = Number(outputDetails.time) + " s";
      }
    }

    return outputDetails;
  }

  function FormatSpace(outputDetails: any) {
    if (outputDetails !== "" && !undefined && !null) {
      if (outputDetails.memory < 1000) {
        outputDetails.memory = Number(outputDetails.memory) + " KB";
      } else {
        outputDetails.memory =
          (Number(outputDetails.memory) / 1000).toFixed(1) + " MB";
      }
    }

    return outputDetails;
  }

  return (
    <>
      <p className="text-lg font-medium mt-4 dark:text-white">Output details</p>
      <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-slate-100 dark:bg-neutral-700 border-transparent dark:text-white mt-2 transition-all">
        <p className="text-sm">
          Status:{" "}
          <span className="font-semibold px-2 py-1 rounded-md">
            {outputDetails?.status?.description}
          </span>
        </p>
        <p className="text-sm">
          Memory:{" "}
          <span className="font-semibold px-2 py-1 rounded-md">
            {FormatSpace(outputDetails).memory}
          </span>
        </p>
        <p className="text-sm">
          Runtime:{" "}
          <span className="font-semibold px-2 py-1 rounded-md">
            {FormatRuntime(outputDetails).time}
          </span>
        </p>
      </div>
    </>
  );
};

export default OutputMetrics;
