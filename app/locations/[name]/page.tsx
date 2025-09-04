import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  type SortValues,
  sortByAlphaOptions,
  sortByDateOptions,
} from "@/models/form";
import { apiRoutes } from "@/models/api";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
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

  const decodedUri = decodeURIComponent(name);
  const locationId = Number(decodedUri.split(" ")[0]);
  const locationName = decodedUri.split(" ").slice(1).join(" ");
  const parsedPage = Number(page);

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
    !parsedPage ||
    parsedPage < 1 ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/locations/${name}?page=1&sortBy=dateDesc`);
  }

  const defaultSortOption = sortBy as SortValues;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Location Details"
          descriptionText={locationName}
          backLinkHref="locations"
          backLinkText="Go to locations"
        />
        <Suspense fallback={<Pending variant="location" />}>
          <LocationDetails locationId={locationId} />
        </Suspense>
        <Separator className="mx-auto w-4/5" />
        <Suspense
          fallback={
            <Pending variant="cardWithControls" listSize={RESULTS_PER_PAGE} />
          }
        >
          <List
            defaultSortOption={defaultSortOption}
            headingText="Sightings"
            page={parsedPage}
            resource={apiRoutes.getSightingsListByType(
              "locationId",
              locationId,
              parsedPage,
              sortBy,
            )}
            sortBy={sortBy}
            sortOptions={sortOptions}
            variant="locationDetail"
          />
        </Suspense>
      </ViewWrapper>
    </>
  );
}
