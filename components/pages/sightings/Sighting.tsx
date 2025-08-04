import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import BirdImage from "@/components/pages/shared/BirdImage";
import {
  type ServerResponseWithError,
  type ServerResponseWithObject,
} from "@/models/api";
import type { SightingWithLocation } from "@/models/display";
import { getSighting } from "@/actions/sighting";

/** Fetch and display sighting data. */
export default async function Sighting({ sightingId }: { sightingId: number }) {
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
      <section>
        <BirdImage bird={sighting.bird} />
      </section>
    </>
  );
}
