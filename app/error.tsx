"use client";

import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { Messages } from "@/models/api";

type ErrorBoundaryProps = {
  error: Error;
};

export default function ErrorBoundary({ error }: ErrorBoundaryProps) {
  const msg =
    error.message === "fetch failed"
      ? Messages.ServerOutageError
      : Messages.UnknownUnexpectedError;
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
