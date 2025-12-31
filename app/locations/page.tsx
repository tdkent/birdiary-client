import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { PAGINATE } from "@/constants/app.constants";
import { getUserProfileOrNull } from "@/helpers/auth";
import { checkValidParamInteger } from "@/helpers/data";
import { ErrorMessages } from "@/types/error-messages.enum";
import {
  type SortValues,
  sortByAlphaOptions,
  sortBySightingsCount,
} from "@/types/list-sort.types";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUserProfileOrNull();

  return {
    title: `${user && user.name ? `${user.name}'s` : "My"} birding locations - Birdiary`,
    description:
      "View a list of your birdwatching locations. Sort locations by name or count of bird sightings. Click on any location for full details.",
  };
}

export default async function LocationsView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/locations?page=${page || "1"}&sortBy=${sortBy || "alphaAsc"}`);
  }

  const user = await getUserProfileOrNull();
  const favBirdId = user && user.favoriteBirdId;

  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions, sortBySightingsCount];
  const defaultSortOption: SortValues = "alphaAsc";

  const route = `/locations?page=${parsedPage}&sortBy=${sortBy}`;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText={`${user && user.name ? `${user.name}'s` : "My"} Birding Locations`}
        />
        {parsedPage && sortOptions.find((option) => option.value === sortBy) ? (
          <>
            <Suspense
              fallback={
                <Pending
                  variant="listWithSorting"
                  listSize={PAGINATE.LARGE_LIST}
                />
              }
            >
              <List
                defaultSortOption={defaultSortOption}
                favBirdId={favBirdId}
                page={parsedPage}
                route={route}
                sortBy={sortBy}
                sortOptions={sortOptions}
                variant="locations"
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
