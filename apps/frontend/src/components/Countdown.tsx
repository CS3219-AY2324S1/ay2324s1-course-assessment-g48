import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type CountdownProps = {
  counter: number;
};

const Countdown: React.FC<CountdownProps> = (
    {counter}
) => {
  return (
    <div className="mx-auto w-10 center">
      <CircularProgressbar
        value={(counter / 30) * 100}
        text={String(counter)}
      ></CircularProgressbar>
    </div>
  );
};
export default Countdown;
