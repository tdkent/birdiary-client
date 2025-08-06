import { getSighting } from "@/actions/sighting";
import EditSightingForm from "@/components/forms/EditSightingForm";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import type {
  ServerResponseWithError,
  ServerResponseWithObject,
} from "@/models/api";
import type { SightingWithLocation } from "@/models/display";

type EditSightingProps = {
  sightingId: number;
};

/** Fetch sighting data and render update form. */
export default async function EditSighting({ sightingId }: EditSightingProps) {
  const result: ServerResponseWithObject | ServerResponseWithError =
    await getSighting(sightingId);

  if ("error" in result) {
    const errorData = result as ServerResponseWithError;
    const msg = Array.isArray(errorData.message)
      ? errorData.message[0]
      : errorData.message;
    return <ErrorDisplay msg={msg} />;
  }

  const sighting = result as SightingWithLocation;
  return (
    <>
      <EditSightingForm sighting={sighting} />
    </>
  );
}
