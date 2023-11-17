/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback } from "react";

type CallbackFunction = (...args: any[]) => void;

export const useDebounce = (callback: CallbackFunction, wait: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef<CallbackFunction | null>(null);
  callbackRef.current = callback;

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (callbackRef.current) {
          callbackRef.current(...args);
        }
        timeoutRef.current = null;
      }, wait);
    },
    [wait]
  );

  return debouncedCallback;
};
