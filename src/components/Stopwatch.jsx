import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [tens, setTens] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTens((prevTens) => (prevTens + 1) % 100);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  useEffect(() => {
    if (tens >= 99) {
      setSeconds((prevSeconds) => (prevSeconds + 1) % 60);
      setTens(0);
    }
  }, [tens]);

  useEffect(() => {
    if (seconds >= 59) {
      setMinutes((prevMinutes) => prevMinutes + 1);
      setSeconds(0);
    }
  }, [seconds]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    setTens(0);
  };

  return (
    <div className="container">
      <h1>Stopwatch</h1>
      <p className="time">
        <span id="minutes">{minutes.toString().padStart(2, '0')}</span>:
        <span id="seconds">{seconds.toString().padStart(2, '0')}</span>:
        <span id="tens">{tens.toString().padStart(2, '0')}</span>
      </p>
      <div className="buttons-container">
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Stopwatch;
