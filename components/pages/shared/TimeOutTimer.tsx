"use client";

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

type TimeOutTimerProps = {
  isThrottled: boolean;
  setIsThrottled: Dispatch<SetStateAction<boolean>>;
};

export default function TimeOutTimer({
  isThrottled,
  setIsThrottled,
}: TimeOutTimerProps) {
  const [throttleTime, setThrottleTime] = useState<number>(-1);

  // Activate throttle timer.
  useEffect(() => {
    if (isThrottled) setThrottleTime(3);
  }, [isThrottled]);

  // Monitor throttle state.
  useEffect(() => {
    if (throttleTime === 0) setIsThrottled(false);
  }, [setIsThrottled, throttleTime]);

  // Update timer state each second.
  useEffect(() => {
    // if (!throttleTime) return;
    let intervalId: NodeJS.Timeout;
    if (throttleTime) {
      intervalId = setInterval(
        () =>
          setThrottleTime((prev) => {
            if (prev <= 1) {
              clearInterval(intervalId);
            }
            return prev - 1;
          }),
        1000,
      );
    }

    return () => clearInterval(intervalId);
  }, [setIsThrottled, throttleTime]);

  return (
    <>
      <p className="px-4 text-destructive">Try again: {throttleTime}</p>
    </>
  );
}
