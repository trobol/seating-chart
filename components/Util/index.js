import { useEffect, useRef } from 'react';

/**
 * This is a replacement for setInterval and clearInterval
 * to understand why this works better
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param {func} callback
 * @param {Number} delay
 */
const useInterval = (callback, delay) => {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
