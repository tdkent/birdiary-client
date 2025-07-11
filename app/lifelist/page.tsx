import { redirect } from "next/navigation";
import List from "@/components/pages/shared/List";
import { apiRoutes } from "@/models/api";
import {
  type SortValues,
  sortByAlphaOptions,
  sortByDateOptions,
} from "@/models/form";

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
      <List
        variant="lifelistSighting"
        resource={apiRoutes.sightingsGroupByType(
          "lifelist",
          parsedPage,
          sortBy,
        )}
        page={parsedPage}
        sortBy={sortBy}
        defaultSortOption={defaultSortOption}
        sortOptions={sortOptions}
      />
    </>
  );
}
