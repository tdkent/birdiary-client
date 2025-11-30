import { getLocation } from "@/actions/location";
import LocationDetails from "@/components/pages/locations/LocationDetails";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Separator } from "@/components/ui/separator";
import { DETAILS_RESULTS_PER_PAGE } from "@/constants/constants";
import { checkValidParamInteger } from "@/helpers/data";
import { apiRoutes } from "@/models/api";
import type { Location } from "@/models/db";
import {
  type SortValues,
  sortByAlphaOptions,
  sortByDateOptions,
} from "@/models/form";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type LocationDetailsViewProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata({
  params,
}: LocationDetailsViewProps): Promise<Metadata> {
  //? check for valid id
  const locationId = (await params).id;
  const location = (await getLocation(Number(locationId))) as Location;

  return {
    title: `${location.name} | Birdiary`,
  };
}

export default async function LocationDetailsView({
  params,
  searchParams,
}: LocationDetailsViewProps) {
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
          backLinkHref="locations"
          backLinkText="Go to all my locations"
        />
        {validId &&
        parsedPage &&
        sortOptions.find((option) => option.value === sortBy) ? (
          <>
            <Suspense fallback={<Pending variant="locationDetails" />}>
              <LocationDetails locationId={validId} />
            </Suspense>
            <Separator className="mx-auto w-4/5" />
            <Suspense
              fallback={
                <Pending
                  variant="listWithSorting"
                  listSize={DETAILS_RESULTS_PER_PAGE}
                />
              }
            >
              <List
                defaultSortOption={defaultSortOption}
                headingText="My Sightings at This Location"
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
            <ErrorDisplay statusCode={400} />
          </>
        )}
      </ViewWrapper>
    </>
  );
}
