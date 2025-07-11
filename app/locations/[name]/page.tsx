import { redirect } from "next/navigation";
import { getLocation } from "@/actions/location";
import type { Location } from "@/models/db";
import {
  type SortValues,
  sortByAlphaOptions,
  sortByDateOptions,
} from "@/models/form";
import { type ExpectedServerError, apiRoutes } from "@/models/api";
import EditLocation from "@/components/pages/locations/EditLocation";
import DeleteLocation from "@/components/pages/locations/DeleteLocation";
import LocationMap from "@/components/pages/locations/LocationMap";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import List from "@/components/pages/shared/List";

type LocationDetailsView = {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function LocationDetailsView({
  params,
  searchParams,
}: LocationDetailsView) {
  const { name } = await params;
  const { page, sortBy } = await searchParams;

  const locationId = parseInt(name.split("%20")[0]);

  if (!locationId || locationId < 1) {
    return (
      <>
        <ErrorDisplay msg="The URL is invalid." />
      </>
    );
  }

  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];

  if (
    !page ||
    !sortBy ||
    !parseInt(page) ||
    parseInt(page) < 1 ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/locations/${name}?page=1&sortBy=dateDesc`);
  }

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

  const defaultSortOption = sortBy as SortValues;
  const parsedPage = parseInt(page);

  return (
    <>
      <header>
        <h1>{location.name}</h1>
        <div className="flex items-center space-x-4">
          <EditLocation location={location} locationId={locationId} />
          <DeleteLocation locationId={locationId} />
        </div>
      </header>
      <LocationMap lat={location.lat} lng={location.lng} />
      <section>
        <List
          variant="locationDetail"
          resource={apiRoutes.sightingsListByType(
            "locationId",
            locationId,
            parsedPage,
            sortBy,
          )}
          page={parsedPage}
          sortBy={sortBy}
          defaultSortOption={defaultSortOption}
          sortOptions={sortOptions}
        />
      </section>
    </>
  );
}
