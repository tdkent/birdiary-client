import { serverApiRequest } from "@/actions/api.actions";
import DeleteLocation from "@/components/pages/locations/DeleteLocation";
import EditLocation from "@/components/pages/locations/EditLocation";
import LocationMap from "@/components/pages/locations/LocationMap";
import DescriptionListItem from "@/components/pages/shared/DescriptionListItem";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import type { ApiResponse } from "@/types/api.types";
import type { Location } from "@/types/location.types";

type LocationDetailsType = {
  locationId: number;
};

export default async function LocationDetails({
  locationId,
}: LocationDetailsType) {
  const result: ApiResponse<Location> = await serverApiRequest({
    route: `/locations/${locationId}`,
    tags: ["location"],
  });

  if (result.error) {
    return <ErrorDisplay msg={result.message} />;
  }

  const { data } = result;
  const { lat, lng, name } = data;

  return (
    <>
      <section className="flex flex-col gap-4 md:w-[85%] md:gap-10">
        <dl className="flex flex-col gap-8 px-2 md:gap-12">
          <DescriptionListItem dt={"Name"} dd={name} />
          <div className="flex flex-col gap-4">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Map
            </dt>
            <dd>
              <LocationMap lat={lat} lng={lng} />
            </dd>
          </div>
        </dl>
        <div className="my-8 flex flex-col gap-4">
          <EditLocation location={data} locationId={locationId} />
          <DeleteLocation locationId={locationId} />
        </div>
      </section>
    </>
  );
}
