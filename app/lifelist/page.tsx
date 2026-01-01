import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { PAGINATE } from "@/constants/app.constants";
import { checkValidParamInteger } from "@/helpers/app.helpers";
import { getUserProfileOrNull } from "@/helpers/auth.helpers";
import { ErrorMessages } from "@/types/error-messages.enum";
import {
  type SortValues,
  sortByAlphaOptions,
  sortByDateOptions,
} from "@/types/list-sort.types";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUserProfileOrNull();

  return {
    title: `${user && user.name ? `${user.name}'s` : "My"} birding life list - Birdiary`,
    description:
      "View your personal birdwatching life list. Shows every unique bird you have observed along with the date. Click on any sighting for full details.",
  };
}

export default async function LifeListView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/lifelist?page=${page || "1"}&sortBy=${sortBy || "alphaAsc"}`);
  }

  const user = await getUserProfileOrNull();
  const favBirdId = user && user.favoriteBirdId;

  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];
  const defaultSortOption: SortValues = "alphaAsc";

  const route = `/sightings?groupBy=lifelist&page=${parsedPage}&sortBy=${sortBy}`;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          backLinkHref="sightings"
          backLinkText="Go to my sightings"
          headingText={`${user && user.name ? `${user.name}'s` : "My"} Birding Life List`}
          subtext="Your life list displays each unique bird species that you have
          observed and the date of your first sighting."
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
                variant="lifeList"
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
