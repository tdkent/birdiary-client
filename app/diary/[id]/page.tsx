import { redirect } from "next/navigation";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import CsrList from "@/components/pages/shared/CsrList";
import { apiRoutes } from "@/models/api";
import { type SortValues, sortByAlphaOptions } from "@/models/form";
import { checkValidParamInteger } from "@/helpers/data";

type DiaryParams = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function DiaryDetailsView({
  params,
  searchParams,
}: DiaryParams) {
  const { id } = await params;
  const { page, sortBy } = await searchParams;

  const validId = checkValidParamInteger(id);
  let validPage: number | null;
  if (!page) validPage = 1;
  else validPage = checkValidParamInteger(page);

  const sortOptions = [...sortByAlphaOptions];

  if (
    !validId ||
    !validPage ||
    !sortBy ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/diary/${id}?page=1&sortBy=alphaAsc`);
  }

  const defaultSortOption = sortBy as SortValues;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          backLinkHref="diary"
          backLinkText="Go to diary"
          headingText="Diary Details"
          descriptionText={`View your birding diary details.`}
        />
        <CsrList
          route={apiRoutes.getSightingsListByType(
            "dateId",
            validId,
            validPage,
            sortBy,
          )}
          variant="diaryDetail"
          pendingVariant="card"
          tag="sightings"
          page={validPage}
          sortBy={sortBy}
          defaultSortOption={defaultSortOption}
          sortOptions={sortOptions}
        />
      </ViewWrapper>
    </>
  );
}
