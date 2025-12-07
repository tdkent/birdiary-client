"use client";

import { exportSightingsData } from "@/actions/profile";
import PendingIcon from "@/components/forms/PendingIcon";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { ExpectedServerError } from "@/models/api";
import { Download } from "lucide-react";
import { useState } from "react";

export default function ExportCsv() {
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setError(null);
    setFetchError(null);
    setPending(true);
    try {
      const result: ExpectedServerError = await exportSightingsData();
      if ("error" in result) {
        return setError(`${result.statusCode}`);
      }
    } catch (error) {
      console.error(error);
      setFetchError(error as Error);
    } finally {
      setPending(false);
    }
  }

  if (fetchError) throw fetchError;

  return (
    <>
      {error && <ErrorDisplay showInline statusCode={error} />}
      <div className="my-6 rounded-md border p-4 md:p-6">
        <h4 className="text-lg md:text-xl">Export Sightings</h4>
        <p className="my-6 text-base">
          Download your sightings data to a CSV file.
        </p>
        <Button
          disabled={pending}
          onClick={handleClick}
          size="lg"
          variant="new"
        >
          {pending ? (
            <PendingIcon strokeWidth={1.5} size={28} />
          ) : (
            <>
              <Download strokeWidth={1.5} />
              Export
            </>
          )}
        </Button>
      </div>
    </>
  );
}
