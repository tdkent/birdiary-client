import { Suspense } from "react";
import { notFound } from "next/navigation";
import Sighting from "@/components/pages/sightings/Sighting";

/** Single sighting view. */
export default async function SightingView({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const parsedId = parseInt(id);
  if (!parsedId || parsedId < 1) notFound();

  return (
    <>
      <header>
        <h1>Sighting Details</h1>
        <p className="text-sm italic">
          View and edit the details of one of your sightings.
        </p>
      </header>
      <Suspense fallback={"Loading..."}>
        <Sighting sightingId={parsedId} />
      </Suspense>
    </>
  );
}
