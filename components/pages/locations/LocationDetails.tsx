import { getLocation } from "@/actions/location";
import DeleteLocation from "@/components/pages/locations/DeleteLocation";
import EditLocation from "@/components/pages/locations/EditLocation";
import LocationMap from "@/components/pages/locations/LocationMap";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import type { ExpectedServerError } from "@/models/api";
import type { Location } from "@/models/db";

type LocationDetailsType = {
  locationId: number;
};

export default async function LocationDetails({
  locationId,
}: LocationDetailsType) {
  const result: Location | ExpectedServerError = await getLocation(locationId);

  if ("error" in result) {
    return <ErrorDisplay statusCode={result.statusCode} />;
  }

  const location = result;

  return (
    <>
      <section className="flex flex-col gap-4 md:w-[85%] md:gap-10">
        <h2>{location.name}</h2>
        <LocationMap lat={location.lat} lng={location.lng} />
        <div className="my-8 flex flex-col gap-4">
          <EditLocation location={location} locationId={locationId} />
          <DeleteLocation locationId={locationId} />
        </div>
      </section>
    </>
  );
}
