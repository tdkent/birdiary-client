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
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

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

  if (!page || !sortBy) {
    redirect(
      `/locations/${id}?page=${page || "1"}&sortBy=${sortBy || "alphaAsc"}`,
    );
  }

  const validId = checkValidParamInteger(id);
  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];
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
        {validId &&
        parsedPage &&
        sortOptions.find((option) => option.value === sortBy) ? (
          <>
            <Suspense fallback={<Pending variant="location" />}>
              <LocationDetails locationId={validId} />
            </Suspense>
            <Separator className="mx-auto w-4/5" />
            <Suspense
              fallback={
                <Pending
                  variant="cardWithControls"
                  listSize={RESULTS_PER_PAGE}
                />
              }
            >
              <List
                defaultSortOption={defaultSortOption}
                headingText="Sightings"
                page={parsedPage}
                resource={apiRoutes.getSightingsByLocation(
                  validId,
                  parsedPage,
                  sortBy,
                )}
                sortBy={sortBy}
                sortOptions={sortOptions}
                variant="locationDetail"
              />
            </Suspense>
          </>
        ) : (
          <>
            <ErrorDisplay msg="Invalid request." />
          </>
        )}
      </ViewWrapper>
    </>
  );
}
