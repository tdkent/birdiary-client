"use client";

import PendingIcon from "@/components/forms/PendingIcon";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { apiRoutes, ExpectedServerError } from "@/models/api";
import { Download } from "lucide-react";
import { useRef, useState } from "react";

export default function ExportCsv() {
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [pending, setPending] = useState(false);

  const { token } = useAuth();
  const linkRef = useRef(null);

  async function handleClick() {
    setError(null);
    setFetchError(null);
    setPending(true);
    try {
      const response = await fetch(apiRoutes.userExportData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result: ExpectedServerError = await response.json();
        return setError(result.message);
      }

      // Create href from blob object
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = linkRef.current as HTMLAnchorElement | null;

      if (!link) return;

      // Simulate click on <a> element to trigger download
      link.href = url;
      link.download = "my-sightings.csv";
      link.click();
      window.URL.revokeObjectURL(url);
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
      {error && <ErrorDisplay showInline msg={error} />}
      <div className="my-6 rounded-md border p-4 md:p-6">
        <h4 className="text-lg md:text-xl">Export Sightings</h4>
        <p className="my-6 text-base">
          Download your sightings data to a CSV file.
        </p>
        <a ref={linkRef} style={{ display: "none" }}></a>
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
