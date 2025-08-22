import { notFound } from "next/navigation";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import EditSighting from "@/components/pages/sightings/EditSighting";

export default async function EditSightingView({
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
          headingText="Edit Sighting"
          descriptionText="Update the details of one of your sightings."
          useSeparator
        />
        <EditSighting sightingId={parsedId} />
      </ViewWrapper>
    </>
  );
}
