import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { RESULTS_PER_PAGE } from "@/constants/constants";
import { getUsername } from "@/helpers/auth";
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
  const username = await getUsername();

  return {
    title: `${username ? `${username}'s` : "My"} birding life list | Birdiary`,
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

  const username = await getUsername();

  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];
  const defaultSortOption: SortValues = "alphaAsc";

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText={`${username ? `${username}'s` : "My"} Birding Life List`}
          backLinkHref="sightings"
          backLinkText="Go to my sightings"
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
