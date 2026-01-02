"use client";

import EditSightingForm from "@/components/forms/EditSightingForm";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import Pending from "@/components/pages/shared/Pending";
import { Button } from "@/components/ui/button";
import { useApi } from "@/context/ApiContext";
import type { SightingWithBirdAndLocation } from "@/types/sighting.types";
import Link from "next/link";

type EditSightingProps = {
  sightingId: number;
};

/** Fetch sighting data and render update form. */
export default function EditSighting({ sightingId }: EditSightingProps) {
  const { useQuery } = useApi();
  const { data, error, pending } = useQuery({
    route: `/sightings/${sightingId}`,
  });

  const sighting = data as SightingWithBirdAndLocation;

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
        <EditSightingForm sighting={sighting} />
        <Button asChild size="lg" variant="secondary">
          <Link href={`/sightings/${sighting.id}`}>Cancel</Link>
        </Button>
      </div>
    </>
  );
}
