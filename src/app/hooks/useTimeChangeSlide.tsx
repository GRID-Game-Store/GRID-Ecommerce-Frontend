import { useEffect } from "react";

export const useTimeChangeSlide = (
  isTouched: boolean,
  current: number,
  // eslint-disable-next-line no-unused-vars
  setCurrent: (value: number) => void,
) => {
  const slidesWrapInSec = 14;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isTouched) {
        return null;
      } else if (current >= 4) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, slidesWrapInSec * 1000);
    return () => clearTimeout(timer);
  }, [current, isTouched, setCurrent]);
  return null;
};
