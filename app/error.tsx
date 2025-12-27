"use client";

import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { ErrorMessages } from "@/types/error-messages.enum";

type ErrorBoundaryProps = {
  error: Error;
};

export default function ErrorBoundary({ error }: ErrorBoundaryProps) {
  let msg = ErrorMessages.Unexpected;

  if (error.message === "Failed to fetch" || error.message === "fetch failed") {
    msg = ErrorMessages.ServerOutage;
  }

  return (
    <>
      <ErrorDisplay msg={msg} />
      <Button
        className="my-8"
        onClick={() => window.location.reload()}
        size="lg"
        variant="secondary"
      >
        Reload
      </Button>
    </>
  );
}
