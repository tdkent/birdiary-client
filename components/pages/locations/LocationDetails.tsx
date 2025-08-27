import DeleteLocation from "@/components/pages/locations/DeleteLocation";
import EditLocation from "@/components/pages/locations/EditLocation";
import LocationMap from "@/components/pages/locations/LocationMap";
import type { Location } from "@/models/db";
import type { ExpectedServerError } from "@/models/api";
import { getLocation } from "@/actions/location";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

export default async function LocationDetails({
  locationId,
}: {
  locationId: number;
}) {
  const location: Location | ExpectedServerError =
    await getLocation(locationId);

  if ("error" in location) {
    const msg = Array.isArray(location.message)
      ? location.message.join(",")
      : location.message;

    return (
      <>
        <ErrorDisplay msg={`${location.error}: ${msg}`} />
      </>
    );
  }
  return (
    <>
      <section className="flex flex-col gap-4 md:w-[85%] md:gap-10">
        <LocationMap lat={location.lat} lng={location.lng} />
        <div className="my-8 flex flex-col gap-4">
          <EditLocation location={location} locationId={locationId} />
          <DeleteLocation locationId={locationId} />
        </div>
      </section>
    </>
  );
}
