import { redirect } from "next/navigation";
import CsrList from "@/components/pages/shared/CsrList";
import {
  type SortValues,
  sortByDateOptions,
  sortBySightingsCount,
} from "@/models/form";
import { apiRoutes } from "@/models/api";

export default async function DiaryView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/diary?page=1&sortBy=dateDesc`);
  }

  const defaultSortOption = sortBy as SortValues;
  const sortOptions = [...sortByDateOptions, sortBySightingsCount];

  return (
    <>
      <header>
        <h1>Diary</h1>
        <p>Your sightings grouped by date.</p>
      </header>
      <CsrList
        route={apiRoutes.groupedSightings("date", page, sortBy)}
        variant="diary"
        tag="diary"
        page={page}
        sortBy={sortBy}
        defaultSortOption={defaultSortOption}
        sortOptions={sortOptions}
      />
    </>
  );
}
