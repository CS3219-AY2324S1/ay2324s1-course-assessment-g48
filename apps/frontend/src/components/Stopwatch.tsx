import React, { useEffect } from "react";
import { ArrowPathIcon, ClockIcon } from "@heroicons/react/24/outline";
import { formatTime as formatStopwatchTime } from "@/utils/format/timeFormat";

type StopwatchProps = {
};

const Stopwatch: React.FC<StopwatchProps> = () => {
  const [showStopwatch, setStopwatch] = React.useState(false);
  const [time, setTime] = React.useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
  
    if (showStopwatch) {
      interval = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [showStopwatch])

  function enableStopwatch() {
    setStopwatch(true);
  }

  function disableStopwatch() {
    setStopwatch(false);
    setTime(0);
  }

  return (
    <div>
      {showStopwatch ? (
        <div className="flex items-center space-x-2 relative rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <div className="text-white">{formatStopwatchTime(time)}</div>
          <ArrowPathIcon className="h-6 w-6 cursor-pointer" aria-hidden="true" onClick={disableStopwatch} />
        </div>
      ) : (
        <div className="flex items-center p-1 h-8 rounded cursor-pointer">
          <button
            type="button"
            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            onClick={enableStopwatch}
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <ClockIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
};
export default Stopwatch;
