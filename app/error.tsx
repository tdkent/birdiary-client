"use client";

import { useEffect } from "react";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

export default function ErrorBoundary({
  error,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("an error occurred:", error);
  }, [error]);

  return (
    <>
      <ErrorDisplay />
    </>
  );
}
