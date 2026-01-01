import { serverApiRequest } from "@/actions/api.actions";
import LocationDetails from "@/components/pages/locations/LocationDetails";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Separator } from "@/components/ui/separator";
import { PAGINATE } from "@/constants/app.constants";
import { checkValidParamInteger } from "@/helpers/app.helpers";
import { getUserProfileOrNull } from "@/helpers/auth.helpers";
import type { ApiResponse } from "@/types/api.types";
import { ErrorMessages } from "@/types/error-messages.enum";
import {
  type SortValues,
  sortByAlphaOptions,
  sortByDateOptions,
} from "@/types/list-sort.types";
import type { Location } from "@/types/location.types";
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
  const { id } = await params;
  const validId = checkValidParamInteger(id);

  if (!validId)
    return {
      title: `Location details - Birdiary`,
      description:
        "View details of a birdwatching location including a list of your sightings.",
    };

  const result: ApiResponse<Location> = await serverApiRequest({
    route: `/locations/${validId}`,
  });

  if (result.error)
    return {
      title: `Location details - Birdiary`,
      description:
        "View details of a birdwatching location including a list of your sightings.",
    };

  return {
    title: `${result.data.name} - Birdiary`,
    description: `View details and a map of ${result.data.name}, and a list of your bird sightings at this location.`,
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

  const user = await getUserProfileOrNull();
  const favBirdId = user && user.favoriteBirdId;

  const validId = checkValidParamInteger(id);
  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];
  const defaultSortOption = sortBy as SortValues;

  const route = `/locations/${validId}/sightings?page=${parsedPage}&sortBy=${sortBy}`;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Location Details"
          backLinkHref="locations"
          backLinkText="Go to my locations"
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
                  listSize={PAGINATE.SMALL_LIST}
                />
              }
            >
              <List
                defaultSortOption={defaultSortOption}
                favBirdId={favBirdId}
                headingText="My Sightings at This Location"
                page={parsedPage}
                route={route}
                sortBy={sortBy}
                sortOptions={sortOptions}
                variant="locationDetail"
              />
            </Suspense>
          </>
        ) : (
          <>
            <ErrorDisplay msg={ErrorMessages.BadRequest} />
          </>
        )}
      </ViewWrapper>
    </>
  );
}
