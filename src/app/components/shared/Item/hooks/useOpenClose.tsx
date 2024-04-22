import { useState } from "react";

export const useOpenClose = (
  arrayElements: Array<any> | undefined,
  defaultValue: Boolean = false,
  reduceValue: number = 4
) => {
  const [isOpen, setIsOpen] = useState<Boolean>(defaultValue);
  let modifiedArrayEl;
  if (isOpen) {
    modifiedArrayEl = arrayElements;
  }
  if (!isOpen && arrayElements) {
    modifiedArrayEl = arrayElements.sort().slice(0, reduceValue);
  }
  return { isOpen, setIsOpen, modifiedArrayEl };
};
