import { Suspense } from "react";
import { redirect } from "next/navigation";
import {
  type SortValues,
  sortByAlphaOptions,
  sortByDateOptions,
} from "@/models/form";
import { apiRoutes } from "@/models/api";
import LocationDetails from "@/components/pages/locations/LocationDetails";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import { RESULTS_PER_PAGE } from "@/constants/constants";

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

  const defaultSortOption = sortBy as SortValues;
  const parsedPage = parseInt(page);

  return (
    <>
      <Suspense fallback={<Pending variant="location" />}>
        <LocationDetails locationId={locationId} />
      </Suspense>
      <section>
        <Suspense
          fallback={
            <Pending variant="cardWithControls" listSize={RESULTS_PER_PAGE} />
          }
        >
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
        </Suspense>
      </section>
    </>
  );
}
