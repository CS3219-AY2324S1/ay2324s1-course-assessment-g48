import React, { useEffect } from "react";
import { ArrowPathIcon, ClockIcon } from "@heroicons/react/24/outline";
import { formatTime as formatStopwatchTime } from "@/utils/format/timeFormat";

type StopwatchProps = {
};

const Stopwatch: React.FC<StopwatchProps> = () => {
  const [stopWatchIsRunning, setStopWatchIsRunning] = React.useState(false);
  const [displayStopwatch, setDisplayStopwatch] = React.useState(false);
  const [time, setTime] = React.useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
  
    if (stopWatchIsRunning) {
      interval = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [stopWatchIsRunning])

  useEffect(() => {
    const storedState = localStorage.getItem("stopwatchState");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setDisplayStopwatch(parsedState.displayStopwatch);
      setStopWatchIsRunning(parsedState.stopWatchIsRunning);
      setTime(parsedState.time);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("stopwatchState", JSON.stringify({ stopWatchIsRunning, displayStopwatch, time }));
  }, [displayStopwatch, stopWatchIsRunning, time]);

  function enableStopwatch() {
    setDisplayStopwatch(true);
    setStopWatchIsRunning(true);
  }

  function disableStopwatch() {
    setDisplayStopwatch(false);
  }

  function resetStopwatch() {
    setStopWatchIsRunning(false);
    disableStopwatch();
    setTime(0);
  }

  const runningInBackground = stopWatchIsRunning ? "text-yellow-400" : "text-gray-400"

  return (
    <div>
      {displayStopwatch ? (
        <div className="flex items-center space-x-2 relative rounded-full bg-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <button className="text-gray-300 hover:text-gray-100 cursor-pointer" onClick={disableStopwatch}> {formatStopwatchTime(time)}</button>
          <ArrowPathIcon className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" aria-hidden="true" onClick={resetStopwatch} />
        </div>
      ) : (
        <div className="flex items-center p-1 h-8 rounded cursor-pointer">
          <button
            type="button"
            className={`relative rounded-full bg-gray-800 p-1 ${runningInBackground} hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
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
