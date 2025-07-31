import { Suspense } from "react";
import { redirect } from "next/navigation";
import List from "@/components/pages/shared/List";
import { apiRoutes } from "@/models/api";
import {
  type SortValues,
  sortByAlphaOptions,
  sortByDateOptions,
} from "@/models/form";
import Pending from "@/components/pages/shared/Pending";
import { RESULTS_PER_PAGE } from "@/constants/constants";

export default async function LifeListView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;
  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];

  if (
    !page ||
    !sortBy ||
    !parseInt(page) ||
    parseInt(page) < 1 ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/lifelist?page=1&sortBy=alphaAsc`);
  }

  const defaultSortOption: SortValues = "alphaAsc";
  const parsedPage = parseInt(page);

  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Life List</h1>
        <p>
          A complete list of all the North American bird species you have
          observed.
        </p>
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
  );
}
