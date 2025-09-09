import { Suspense } from "react";
import { redirect } from "next/navigation";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import List from "@/components/pages/shared/List";
import { apiRoutes } from "@/models/api";
import {
  type SortValues,
  sortByAlphaOptions,
  sortByDateOptions,
} from "@/models/form";
import Pending from "@/components/pages/shared/Pending";
import { RESULTS_PER_PAGE } from "@/constants/constants";
import { checkValidParamInteger } from "@/helpers/data";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

export default async function LifeListView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/lifelist?page=${page || "1"}&sortBy=${sortBy || "alphaAsc"}`);
  }

  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];
  const defaultSortOption: SortValues = "alphaAsc";

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Life List"
          descriptionText="View your complete North American birdwatching life list."
          backLinkHref="sightings"
          backLinkText="Go to sightings"
        />
        {parsedPage && sortOptions.find((option) => option.value === sortBy) ? (
          <>
            <Suspense
              fallback={
                <Pending
                  variant="listDoubleRowWithControls"
                  listSize={RESULTS_PER_PAGE}
                />
              }
            >
              <List
                variant="lifelistSighting"
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
