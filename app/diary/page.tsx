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
  const sortOptions = [...sortByDateOptions, sortBySightingsCount];

  if (
    !page ||
    !sortBy ||
    !parseInt(page) ||
    parseInt(page) < 1 ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/diary?page=1&sortBy=dateDesc`);
  }

  const defaultSortOption = sortBy as SortValues;
  const parsedPage = parseInt(page);

  return (
    <>
      <header>
        <h1>My Diary</h1>
        <p>Your sightings grouped by date.</p>
      </header>
      <CsrList
        route={apiRoutes.sightingsGroupByType("date", parsedPage, sortBy)}
        variant="diary"
        pendingVariant="listSingleRow"
        tag="diary"
        page={parsedPage}
        sortBy={sortBy}
        defaultSortOption={defaultSortOption}
        sortOptions={sortOptions}
      />
    </>
  );
}
