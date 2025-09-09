import { Suspense } from "react";
import { redirect } from "next/navigation";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import {
  type SortValues,
  sortByAlphaOptions,
  sortBySightingsCount,
} from "@/models/form";
import { apiRoutes } from "@/models/api";
import { RESULTS_PER_PAGE } from "@/constants/constants";
import { checkValidParamInteger } from "@/helpers/data";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

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
        <ViewHeader
          headingText="Locations"
          descriptionText="A list of all the locations where you have observed birds."
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
                variant="location"
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
