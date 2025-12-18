"use client";

import { signOut as signOutAction } from "@/actions/auth";
import { getSighting } from "@/actions/sighting";
import EditSightingForm from "@/components/forms/EditSightingForm";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import Pending from "@/components/pages/shared/Pending";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { checkSession } from "@/helpers/auth";
import { Messages } from "@/models/api";
import type { SightingWithBirdAndLocation } from "@/models/display";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type EditSightingProps = {
  sightingId: number;
};

/** Fetch sighting data and render update form. */
export default function EditSighting({ sightingId }: EditSightingProps) {
  const [data, setData] = useState<SightingWithBirdAndLocation | null>(null);
  const [error, setError] = useState<string | string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [pending, setPending] = useState(false);

  const { signOut } = useAuth();

  useEffect(() => {
    async function query() {
      setError(null);
      const hasSession = await checkSession();
      if (hasSession) {
        setPending(true);
        try {
          const result = await getSighting(sightingId);

          if ("error" in result) {
            if (result.statusCode === 401) {
              toast.error(Messages.InvalidToken);
              signOut();
              await signOutAction();
            }
            return setError(result.message);
          }

          setData(result);
        } catch (error) {
          console.error(error);
          setFetchError(error as Error);
        } finally {
          setPending(false);
        }
      } else {
        if (!window.localStorage.getItem("sightings")) {
          window.localStorage.setItem("sightings", "[]");
        }
        const data = JSON.parse(
          window.localStorage.getItem("sightings")!,
        ) as SightingWithBirdAndLocation[];
        const sighting = data.find((s) => s.id === sightingId);
        if (!sighting) return setError(Messages.NotFoundError);
        setData(sighting);
      }
    }
    query();
  }, [sightingId, signOut]);

  if (fetchError) throw fetchError;

  if (error) {
    return <ErrorDisplay msg={error} />;
  }

  if (!data || pending) {
    return (
      <>
        <Pending variant="sightingForm" />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <EditSightingForm sighting={data} />
        <Button asChild size="lg" variant="secondary">
          <Link href={`/sightings/${data.id}`}>Cancel</Link>
        </Button>
      </div>
    </>
  );
}
