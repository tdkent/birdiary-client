"use client";

import { deleteSessionCookie } from "@/actions/auth.actions";
import { getSighting } from "@/actions/sighting";
import EditSightingForm from "@/components/forms/EditSightingForm";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import Pending from "@/components/pages/shared/Pending";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { checkSession } from "@/helpers/auth";
import type { ApiResponse } from "@/types/api.types";
import { ErrorMessages } from "@/types/error-messages.enum";
import type { SightingWithBirdAndLocation } from "@/types/sighting.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    async function query() {
      setError(null);
      const hasSession = await checkSession();
      if (hasSession) {
        setPending(true);
        try {
          const result: ApiResponse<SightingWithBirdAndLocation> =
            await getSighting(sightingId);

          if (result.error) {
            if (result.statusCode === 401) {
              toast.error(ErrorMessages.InvalidSession);
              signOut();
              deleteSessionCookie();
              router.replace("/signin");
            }
            return setError(result.message);
          }

          setData(result.data);
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
        if (!sighting) return setError(ErrorMessages.NotFound);
        setData(sighting);
      }
    }
    query();
  }, [router, sightingId, signOut]);

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
