import useTimer from "@/hook/useTimer";
import { count } from "console";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type CountdownProps = {
  counter: number;
};

const Countdown: React.FC<CountdownProps> = (
    {counter}
) => {
  useEffect(() => {
    console.log(counter);
  }, [counter]);
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
