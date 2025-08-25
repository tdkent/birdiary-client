import { notFound } from "next/navigation";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
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
      <ViewWrapper>
        <ViewHeader
          headingText="Sighting Details"
          descriptionText="View and edit the details of one of your sightings."
        />
        <Sighting sightingId={parsedId} />
      </ViewWrapper>
    </>
  );
}
