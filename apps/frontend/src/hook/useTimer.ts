import { useEffect, useState } from "react";

function useTimer() {
  const [countDownDate, setCountDownDate] = useState(
    localStorage.getItem("countDownDate")
      ? parseInt(localStorage.getItem("countDownDate") ?? "0")
      : 10 + new Date().getTime()
  );
  const [isRunning, setIsRunning] = useState(
    localStorage.getItem("isRunning") === "true" ? true : false
  );

  useEffect(() => {
    let initialCountDown = countDownDate - new Date().getTime();
    if (initialCountDown < 1) {
      initialCountDown = 0;
    }
    const interval = setInterval(() => {
      setCountDown(initialCountDown);
      initialCountDown -= 1000;
      if (initialCountDown < 1 ) {
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
    setCountDownDate(deadline+10);
    localStorage.setItem("isRunning", "true");
    localStorage.setItem("countDownDate", deadline.toString());
  };

  const reset = () => {
  setCountDown(30 * 1000); // 30 seconds in milliseconds
  setIsRunning(false);
  localStorage.removeItem("countDownDate");
  localStorage.setItem("isRunning", "false");
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
