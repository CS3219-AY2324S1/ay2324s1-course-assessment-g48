import { useEffect, useMemo, useState } from "react";

function useTimer() {
    const [deadlineTime, setDealineTime] = useState(
        new Date(localStorage.getItem('deadlineTime')?? new Date())
    )
    const [isRunning, setIsRunning] = useState(
        localStorage.getItem('isTimerRunning') === 'true' || false
      );
    
      const reset = () => {
        setDealineTime(new Date());
        setIsRunning(false);
        localStorage.removeItem('deadlineTime');
        localStorage.removeItem('isTimerRunning');
      };

      const toggleTimer = () => {
        const newIsRunning = !isRunning;
        setIsRunning(newIsRunning);
        setDealineTime(new Date(deadlineTime.getTime() + 30* 1000));
        localStorage.setItem('isTimerRunning', String(newIsRunning));
      };
    
      useEffect(() => {
        console.log(deadlineTime)
        if (!isRunning) {
            reset()
        }
      }, [isRunning ]);

  return {isRunning, toggleTimer, reset, deadlineTime };
}

export default useTimer;