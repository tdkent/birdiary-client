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
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import { RESULTS_PER_PAGE } from "@/constants/constants";
import { checkValidParamInteger } from "@/helpers/data";

type LocationDetailsView = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function LocationDetailsView({
  params,
  searchParams,
}: LocationDetailsView) {
  const { id } = await params;
  const { page, sortBy } = await searchParams;

  const validId = checkValidParamInteger(id);
  let validPage: number | null;
  if (!page) validPage = 1;
  else validPage = checkValidParamInteger(page);

  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];

  if (
    !validId ||
    !validPage ||
    !sortBy ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/locations/${validId}?page=1&sortBy=dateDesc`);
  }

  const defaultSortOption = sortBy as SortValues;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Location Details"
          descriptionText="View details of this location."
          backLinkHref="locations"
          backLinkText="Go to locations"
        />
        <Suspense fallback={<Pending variant="location" />}>
          <LocationDetails locationId={validId} />
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
            page={validPage}
            resource={apiRoutes.getSightingsByLocation(
              validId,
              validPage,
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
