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
  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/diary/${id}?page=${page || "1"}&sortBy=${sortBy || "alphaAsc"}`);
  }

  const validDateId = convertDateIdToValidDate(id);
  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions];
  const defaultSortOption = sortBy as SortValues;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          backLinkHref="diary"
          backLinkText="Go to diary"
          headingText="Diary Details"
          descriptionText="View your birding diary details."
        />
        {validDateId &&
        parsedPage &&
        sortOptions.find((option) => option.value === sortBy) ? (
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
        ) : (
          <ErrorDisplay msg="Invalid request." />
        )}
      </ViewWrapper>
    </>
  );
}
