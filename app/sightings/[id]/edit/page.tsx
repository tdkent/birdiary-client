import { notFound } from "next/navigation";
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
      <header>
        <h1>Edit Sighting</h1>
        <p>Update the details of one of your sightings.</p>
      </header>
      <EditSighting sightingId={parsedId} />
    </>
  );
}
