"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import EditSightingForm from "@/components/forms/EditSightingForm";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import {
  apiRoutes,
  Messages,
  type ServerResponseWithError,
  type ServerResponseWithObject,
} from "@/models/api";
import type { SightingWithLocation } from "@/models/display";
import { getCookie } from "@/helpers/auth";
import Pending from "@/components/pages/shared/Pending";
import { signOut as signOutAction } from "@/actions/auth";

type EditSightingProps = {
  sightingId: number;
};

/** Fetch sighting data and render update form. */
export default function EditSighting({ sightingId }: EditSightingProps) {
  const [data, setData] = useState<SightingWithLocation | null>(null);
  const [error, setError] = useState<number | string | null>(null);
  const [pending, setPending] = useState(false);

  const { signOut } = useAuth();
  const { toast } = useToast();

  const route = apiRoutes.sighting(sightingId);

  useEffect(() => {
    async function query() {
      setError(null);
      const token = await getCookie();
      if (token) {
        setPending(true);
        try {
          const response = await fetch(route, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const result: ServerResponseWithObject | ServerResponseWithError =
            await response.json();

          if ("error" in result) {
            if (result.statusCode === 401) {
              toast({
                variant: "destructive",
                description: Messages.InvalidToken,
              });
              signOut();
              await signOutAction();
            }
            throw new Error(`${result.statusCode}`);
          }

          const sighting = result as SightingWithLocation;
          setData(sighting);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError(500);
          }
        } finally {
          setPending(false);
        }
      } else {
        if (!window.localStorage.getItem("sightings")) {
          window.localStorage.setItem("sightings", "[]");
        }
        const data = JSON.parse(
          window.localStorage.getItem("sightings")!,
        ) as SightingWithLocation[];
        const sighting = data.find((s) => s.id === sightingId);
        if (!sighting) return setError(404);
        setData(sighting);
      }
    }
    query();
  }, [route, sightingId, signOut, toast]);

  if (error) {
    return <ErrorDisplay statusCode={error} />;
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
