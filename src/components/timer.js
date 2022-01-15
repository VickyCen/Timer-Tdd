import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const useTimer = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerId = useRef();
  const updatedValue = useRef();

  useEffect(() => {
    updatedValue.current = value + 1;
  }, [value]);

  useEffect(() => {
    if (timerRunning) {
      timerId.current = setInterval(() => {
        setValue(updatedValue.current);
      }, 1000);
    }
    return () => {
      clearInterval(timerId.current);
    };
  }, [timerRunning]);

  const resumeTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setValue(0);
  };

  return { value, timerRunning, resumeTimer, resetTimer };
};

const propTypes = {
  value: PropTypes.number,
  timerRunning: PropTypes.boolean,
};

const Timer = () => {
  const { value, timerRunning, resumeTimer, resetTimer } = useTimer(0);

  return (
    <div>
      <div id="display-value">{value}</div>
      <button onClick={resumeTimer}>{timerRunning ? "Pause" : "Start"}</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
