import { useEffect, useRef, useState } from 'react';

const useTimer = (maxTime, ms) => {
  const [time, setTime] = useState(0);
  const [timeOver, setTimeOver] = useState(false);
  let intervalId = useRef(null);

  useEffect(() => {
    intervalId.current = setInterval(() => setTime((prev) => prev + 1), ms);
    return () => {
      setTime(0);
      setTimeOver(false);
      clearInterval(intervalId.current);
    };
  }, [maxTime, ms]);

  useEffect(() => {
    if (time === maxTime) {
      setTimeOver(true);
      clearInterval(intervalId.current);
    }
  }, [time]);

  const resetTimer = () => {
    setTime(0);
    setTimeOver(false);
    clearInterval(intervalId.current);
    intervalId.current = setInterval(() => setTime((prev) => prev + 1), ms);
  };

  return { time, timeOver, resetTimer };
};

export default useTimer;
