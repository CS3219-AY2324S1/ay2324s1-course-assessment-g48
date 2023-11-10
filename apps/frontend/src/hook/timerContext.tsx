// TimerContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type TimerContextType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  toggleTimer: (deadline: number) => void;
  reset: () => void;
  isRunning: boolean;
  countDown: number;
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const useTimer = (): TimerContextType => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};

type TimerProviderProps = {
  children: ReactNode;
};

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [countDownDate, setCountDownDate] = useState(new Date().getTime());
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let initialCountDown = countDownDate - new Date().getTime();
    if (initialCountDown < 1) {
      initialCountDown = 0;
    }
    const interval = setInterval(() => {
      setCountDown(initialCountDown);
      initialCountDown -= 1000;
      if (initialCountDown < 1) {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  const toggleTimer = (deadline: number) => {
    setIsRunning(true);
    setCountDownDate(deadline + 10);
  };

  const reset = () => {
    setCountDown(0); // 30 seconds in milliseconds
    setIsRunning(false);
  };

  return (
    <TimerContext.Provider
      value={{
        days,
        hours,
        minutes,
        seconds,
        toggleTimer,
        reset,
        isRunning,
        countDown,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
