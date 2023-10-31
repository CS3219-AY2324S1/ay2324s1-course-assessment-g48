type OutputMetricsProps = {
  outputDetails: any;
};

const OutputMetrics: React.FC<OutputMetricsProps> = ({ outputDetails }) => {
  return (
    <>
      <p className="text-sm font-medium mt-4 dark:text-white">Output details</p>
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
            {outputDetails?.memory}
          </span>
        </p>
        <p className="text-sm">
          Time:{" "}
          <span className="font-semibold px-2 py-1 rounded-md">
            {outputDetails?.time}
          </span>
        </p>
      </div>
    </>
  );
};

export default OutputMetrics;
