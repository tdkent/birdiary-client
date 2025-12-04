import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { RESULTS_PER_PAGE } from "@/constants/constants";
import { getUserProfileOrNull } from "@/helpers/auth";
import { checkValidParamInteger } from "@/helpers/data";
import { apiRoutes } from "@/models/api";
import {
  type SortValues,
  sortByAlphaOptions,
  sortByDateOptions,
} from "@/models/form";
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

  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];
  const defaultSortOption: SortValues = "alphaAsc";

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
                  listSize={RESULTS_PER_PAGE}
                />
              }
            >
              <List
                variant="lifeList"
                resource={apiRoutes.getSightingsGroupByType(
                  "lifelist",
                  parsedPage,
                  sortBy,
                )}
                page={parsedPage}
                sortBy={sortBy}
                defaultSortOption={defaultSortOption}
                sortOptions={sortOptions}
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
