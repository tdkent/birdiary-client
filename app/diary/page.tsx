import { redirect } from "next/navigation";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
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
  const parsedPage = Number(page);

  if (
    !page ||
    !sortBy ||
    !parsedPage ||
    parsedPage < 1 ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/diary?page=1&sortBy=dateDesc`);
  }

  const defaultSortOption = sortBy as SortValues;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Diary"
          descriptionText="View a list of your sightings grouped by date."
        />
        <CsrList
          route={apiRoutes.getSightingsGroupByType("date", parsedPage, sortBy)}
          variant="diary"
          pendingVariant="listSingleRow"
          tag="diary"
          page={parsedPage}
          sortBy={sortBy}
          defaultSortOption={defaultSortOption}
          sortOptions={sortOptions}
        />
      </ViewWrapper>
    </>
  );
}
