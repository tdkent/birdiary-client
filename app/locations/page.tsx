import { redirect } from "next/navigation";
import List from "@/components/pages/shared/List";
import { BASE_URL } from "@/constants/env";
import {
  type SortValues,
  sortByAlphaOptions,
  sortBySightingsCount,
} from "@/models/form";

export default async function LocationsView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;
  if (!page || !sortBy) {
    redirect(`/locations?page=1&sortBy=alphaAsc`);
  }

  const resource = `${BASE_URL}/sightings?groupBy=location&page=${page}&sortBy=${sortBy}`;

  const defaultOption: SortValues = "alphaAsc";
  const sortOptions = [...sortByAlphaOptions, sortBySightingsCount];
  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Locations</h1>
        <p>A list of all the locations where you have observed birds.</p>
      </header>
      <List
        variant="location"
        resource={resource}
        page={page}
        sortBy={sortBy}
        defaultOption={defaultOption}
        sortOptions={sortOptions}
      />
    </>
  );
}
