import { getLocation } from "@/actions/location";
import DeleteLocation from "@/components/pages/locations/DeleteLocation";
import EditLocation from "@/components/pages/locations/EditLocation";
import LocationMap from "@/components/pages/locations/LocationMap";
import DescriptionListItem from "@/components/pages/shared/DescriptionListItem";
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
    return <ErrorDisplay msg={result.message} />;
  }

  const location = result;

  return (
    <>
      <section className="flex flex-col gap-4 md:w-[85%] md:gap-10">
        <dl className="flex flex-col gap-8 px-2 md:gap-12">
          <DescriptionListItem dt={"Name"} dd={location.name} />
          <div className="flex flex-col gap-4">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Map
            </dt>
            <dd>
              <LocationMap lat={location.lat} lng={location.lng} />
            </dd>
          </div>
        </dl>
        <div className="my-8 flex flex-col gap-4">
          <EditLocation location={location} locationId={locationId} />
          <DeleteLocation locationId={locationId} />
        </div>
      </section>
    </>
  );
}
