import { useEffect, useState } from "react";

type OutputMetricsProps = {
  outputDetails: any;
};

const OutputMetrics: React.FC<OutputMetricsProps> = ({ outputDetails }) => {
  const [time, setTime] = useState("");
  const [memory, setMemory] = useState("");

  // console.log("outputDetails in OutputMetrics", outputDetails);

  useEffect(() => {
    formatSpace(outputDetails);
    formatRuntime(outputDetails);
  }, [outputDetails]);

  function formatRuntime(outputDetails: any) {
    if (
      outputDetails !== "" &&
      outputDetails !== undefined &&
      outputDetails !== null
    ) {
      if (outputDetails.time < 1) {
        setTime(Number(outputDetails.time) * 1000 + " ms");
      } else {
        setTime((outputDetails.time = Number(outputDetails.time) + " s"));
      }
    }

    return outputDetails;
  }

  function formatSpace(outputDetails: any) {
    if (
      outputDetails !== "" &&
      outputDetails !== undefined &&
      outputDetails !== null
    ) {
      if (outputDetails.memory < 1000) {
        setMemory(Number(outputDetails.memory) + " KB");
      } else {
        setMemory((Number(outputDetails.memory) / 1000).toFixed(1) + " MB");
      }
    }

    return outputDetails;
  }

  return (
    <>
      <div className="w-5/6 cursor-text rounded-lg border px-3 py-[10px] bg-slate-100 dark:bg-neutral-700 border-transparent dark:text-white mt-2 transition-all">
        <p className="text-sm">
          Status:{" "}
          <span className="font-semibold px-2 py-1 rounded-md">
            {outputDetails?.status?.description}
          </span>
        </p>
        <p className="text-sm">
          Memory:{" "}
          <span className="font-semibold px-2 py-1 rounded-md">{memory}</span>
        </p>
        <p className="text-sm">
          Runtime:{" "}
          <span className="font-semibold px-2 py-1 rounded-md">{time}</span>
        </p>
      </div>
    </>
  );
};

export default OutputMetrics;
