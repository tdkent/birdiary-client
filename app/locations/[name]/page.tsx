import { redirect } from "next/navigation";
import { getLocation } from "@/actions/location";
import {
  type Location,
  type SortValues,
  sortByAlphaOptions,
  sortByDateOptions,
} from "@/types/models";
import { type ExpectedServerError, apiRoutes } from "@/types/api";
import EditLocation from "@/components/pages/locations/EditLocation";
import LocationMap from "@/components/pages/locations/LocationMap";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import List from "@/components/pages/shared/List";
import { BASE_URL } from "@/constants/env";

type LocationDetailsView = {
  params: { name: string };
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function LocationDetailsView({
  params,
  searchParams,
}: LocationDetailsView) {
  const { name } = await params;
  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/locations/${name}?page=1&sortBy=dateDesc`);
  }

  const locationId = Number(name.split("-")[name.split("-").length - 1]);

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

  const resource =
    BASE_URL + apiRoutes.sightingsByLocation(locationId, page, sortBy);
  const defaultOption = sortBy as SortValues;
  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];

  return (
    <>
      <header>
        <h1>{location.name}</h1>
        <EditLocation location={location} locationId={locationId} />
      </header>
      <LocationMap lat={location.lat} lng={location.lng} />
      <section>
        <List
          variant="locationDetail"
          resource={resource}
          page={page}
          sortBy={sortBy}
          defaultOption={defaultOption}
          sortOptions={sortOptions}
        />
      </section>
    </>
  );
}
