import { Suspense } from "react";
import { redirect } from "next/navigation";
import List from "@/components/pages/shared/List";
import Pending from "@/components/pages/shared/Pending";
import {
  type SortValues,
  sortByAlphaOptions,
  sortBySightingsCount,
} from "@/models/form";
import { apiRoutes } from "@/models/api";
import { RESULTS_PER_PAGE } from "@/constants/constants";

export default async function LocationsView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;
  const sortOptions = [...sortByAlphaOptions, sortBySightingsCount];

  if (
    !page ||
    !sortBy ||
    !parseInt(page) ||
    parseInt(page) < 1 ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/locations?page=1&sortBy=alphaAsc`);
  }

  const defaultSortOption: SortValues = "alphaAsc";
  const parsedPage = parseInt(page);
  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Locations</h1>
        <p>A list of all the locations where you have observed birds.</p>
      </header>
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
          resource={apiRoutes.sightingsGroupByType(
            "location",
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
  );
}
