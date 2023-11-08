import { useEffect, useState } from "react";

function useTimer() {
  const [countDownDate, setCountDownDate] = useState(
    sessionStorage.getItem("countDownDate")
      ? parseInt(sessionStorage.getItem("countDownDate") ?? "0")
      : 10 + new Date().getTime()
  );
  const [isRunning, setIsRunning] = useState(
    sessionStorage.getItem("isRunning") === "true" ? true : false
  );

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
    sessionStorage.setItem("isRunning", "true");
    sessionStorage.setItem("countDownDate", deadline.toString());
  };

  const reset = () => {
  setCountDown(30 * 1000); // 30 seconds in milliseconds
  setIsRunning(false);
  sessionStorage.removeItem("countDownDate");
  sessionStorage.setItem("isRunning", "false");
};

  return {
    days,
    hours,
    minutes,
    seconds,
    toggleTimer,
    reset,
    isRunning,
    countDown,
  };
}

export default useTimer;
