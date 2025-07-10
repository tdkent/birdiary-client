import { redirect } from "next/navigation";
import List from "@/components/pages/shared/List";
import { BASE_URL } from "@/constants/env";
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
  if (!page || !sortBy) {
    redirect(`/lifelist?page=1&sortBy=alphaAsc`);
  }

  const resource = `${BASE_URL}/sightings?groupBy=lifelist&page=${page}&sortBy=${sortBy}`;

  const defaultOption: SortValues = "alphaAsc";
  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];

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
        resource={resource}
        page={page}
        sortBy={sortBy}
        defaultOption={defaultOption}
        sortOptions={sortOptions}
      />
    </>
  );
}
