import useTimer from "@/hook/useTimer";
import { count } from "console";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type CountdownProps = {
};

const Countdown: React.FC<CountdownProps> = (
    {}
    ) => {
        const {deadlineTime, isRunning} = useTimer();
        const [counter, setCountDown] = useState<number>(0);
        const getSecondsDifference = (date1:Date , date2:Date):number =>  {
            const millisecondsDifference = Math.abs(date1.getTime() - date2.getTime());
            const secondsDifference = Math.floor(millisecondsDifference / 1000);
            return secondsDifference;
          }
        useEffect(() => {
            if (isRunning) {
                setInterval(() => {
                    const value = getSecondsDifference(deadlineTime, new Date());
                    console.log(value)
                    setCountDown(value);
                }, 1000);
            }
            
        }, [isRunning, deadlineTime])
  return (
    <div className="mx-auto mt-3 w-1/6 center">
      <CircularProgressbar
        value={(counter / 30) * 100}
        text={String(counter)}
      ></CircularProgressbar>
    </div>
  );
};
export default Countdown;
