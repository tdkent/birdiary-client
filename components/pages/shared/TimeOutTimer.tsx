"use client";

import { Duration } from "luxon";
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

  const TIMEOUT_INTERVAL = 300; // seconds

  // Activate throttle timer.
  useEffect(() => {
    if (isThrottled) setThrottleTime(TIMEOUT_INTERVAL);
  }, [isThrottled]);

  // Monitor throttle state.
  useEffect(() => {
    if (throttleTime === 0) setIsThrottled(false);
  }, [setIsThrottled, throttleTime]);

  // Update timer state each second.
  useEffect(() => {
    if (!throttleTime) return;
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

  const duration = Duration.fromObject({ seconds: throttleTime });
  const timer = duration.toFormat("m:ss");

  return (
    <>
      {" "}
      <span>Retry: {timer}</span>
    </>
  );
}
