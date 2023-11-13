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
      <CircularProgressbar
        value={(counter / 30) * 100}
        text={String(counter)}
      ></CircularProgressbar>
  );
};
export default Countdown;
