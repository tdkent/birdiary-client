import { redirect } from "next/navigation";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import CsrList from "@/components/pages/shared/CsrList";
import { apiRoutes } from "@/models/api";
import { type SortValues, sortByAlphaOptions } from "@/models/form";
import { checkValidParamInteger } from "@/helpers/data";
import { convertDateIdToValidDate } from "@/helpers/dates";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type DiaryParams = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function DiaryDetailsView({
  params,
  searchParams,
}: DiaryParams) {
  const { id } = await params;
  const validDateId = convertDateIdToValidDate(id);
  if (!validDateId) return <ErrorDisplay msg="Invalid request." />;

  const { page, sortBy } = await searchParams;
  if (!page || !sortBy) {
    redirect(`/diary/${id}?page=${page || "1"}&sortBy=${sortBy || "alphaAsc"}`);
  }

  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions];
  const defaultSortOption = sortBy as SortValues;

  if (
    !parsedPage ||
    (sortOptions && !sortOptions.find((option) => option.value === sortBy))
  ) {
    return (
      <>
        <ViewWrapper>
          <ViewHeader
            headingText="Diary Details"
            descriptionText="View your birding diary details."
            backLinkHref="diary"
            backLinkText="Go to diary"
          />
          <ErrorDisplay msg="Invalid request." />
        </ViewWrapper>
      </>
    );
  }

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          backLinkHref="diary"
          backLinkText="Go to diary"
          headingText="Diary Details"
          descriptionText="View your birding diary details."
        />
        <CsrList
          route={apiRoutes.getSightingsListByType(
            "dateId",
            validDateId,
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
