import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { RESULTS_PER_PAGE } from "@/constants/constants";
import { checkValidParamInteger } from "@/helpers/data";
import { apiRoutes } from "@/models/api";
import {
  type SortValues,
  sortByAlphaOptions,
  sortBySightingsCount,
} from "@/models/form";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My bird sighting locations | Birdiary",
};

export default async function LocationsView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/locations?page=${page || "1"}&sortBy=${sortBy || "alphaAsc"}`);
  }

  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions, sortBySightingsCount];
  const defaultSortOption: SortValues = "alphaAsc";

  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="My Birding Locations" />
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
                variant="locations"
                resource={apiRoutes.locations(parsedPage, sortBy)}
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
