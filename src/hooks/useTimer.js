import { useEffect, useRef, useState } from 'react';

const useTimer = (maxTime, ms) => {
  const [time, setTime] = useState(maxTime);
  const intervalId = useRef(null);

  useEffect(() => {
    intervalId.current = setInterval(() => setTime((prev) => (prev === 0 ? prev : prev - 1)), ms);
    return () => {
      clearInterval(intervalId.current);
    };
  }, [maxTime, ms]);

  const start = () => {
    if (intervalId.current === NULL)
      intervalId.current = setInterval(() => setTime((prev) => (prev === 0 ? prev : prev - 1)), ms);
  };

  const stop = () => {
    if (intervalId.current !== NULL) {
      clearInterval(intervalId.current);
      intervalId.current = NULL;
    }
  };

  const reset = () => {
    setTime(0);
    stop();
  };

  return { time, start, stop, reset };
};

export default useTimer;
