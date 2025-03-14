"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("an error occurred:", error);
  }, [error]);

  return (
    <div>
      <h2>Sorry, an unexpected error occurred</h2>
      <p>Error message: {error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
