import { useEffect, useState } from "react";

function useTimer() {
  const [countDownDate, setCountDownDate] = useState(
    localStorage.getItem("countDownDate")
      ? parseInt(localStorage.getItem("countDownDate")??'0')
      : new Date().getTime()
  );
  const [isRunning, setIsRunning] = useState(
    localStorage.getItem("isRunning") === "true" ? true : false
  );
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  const toggleTimer = (deadline:number) => {
    const newState = true;
    console.log(newState);
    setIsRunning(newState);
    localStorage.setItem("isRunning", newState.toString());
    if (newState) {
      setCountDownDate(deadline);
      localStorage.setItem("countDownDate", deadline.toString());
    } 
  }

  const reset = () => {
    setIsRunning(false);
    setCountDown(0);
    localStorage.removeItem("countDownDate");
    localStorage.setItem("isRunning", "false");
  }
    
  useEffect(() => {
    if (isRunning) {
      if (countDown < 0) {
        reset();
      }
      const interval = setInterval(() => {
        console.log(seconds)
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);
      return () => clearInterval(interval) 
  }
      }, [countDownDate, isRunning, countDown]);
  

  return {days, hours, minutes, seconds, toggleTimer, reset, isRunning, countDown};
}

export default useTimer;