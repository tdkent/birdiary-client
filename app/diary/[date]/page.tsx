import { redirect } from "next/navigation";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import CsrList from "@/components/pages/shared/CsrList";
import { createLocaleString } from "@/helpers/dates";
import { apiRoutes } from "@/models/api";
import { type SortValues, sortByAlphaOptions } from "@/models/form";

type DiaryParams = {
  params: Promise<{ date: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function DiaryDetailsView({
  params,
  searchParams,
}: DiaryParams) {
  const { date } = await params;
  const sortOptions = [...sortByAlphaOptions];

  const { page, sortBy } = await searchParams;
  const parsedPage = Number(page);

  if (
    !page ||
    !sortBy ||
    !parsedPage ||
    parsedPage < 1 ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/diary/${date}?page=1&sortBy=alphaAsc`);
  }

  const defaultSortOption = sortBy as SortValues;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          backLinkHref="diary"
          backLinkText="Go to diary"
          headingText="Diary Details"
          descriptionText={`View your birding diary for ${createLocaleString(date, "huge")}.`}
        />
        <CsrList
          route={apiRoutes.getSightingsListByType(
            "dateId",
            date,
            parsedPage,
            sortBy,
          )}
          variant="diaryDetail"
          pendingVariant="card"
          tag="sightings"
          page={parsedPage}
          sortBy={sortBy}
          defaultSortOption={defaultSortOption}
          sortOptions={sortOptions}
        />
      </ViewWrapper>
    </>
  );
}
