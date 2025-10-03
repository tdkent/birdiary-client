import CsrList from "@/components/pages/shared/CsrList";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import SignedOffBanner from "@/components/pages/shared/SignedOffBanner";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { checkValidParamInteger } from "@/helpers/data";
import { convertDateIdToValidDate, createLocaleString } from "@/helpers/dates";
import { apiRoutes } from "@/models/api";
import { type SortValues, sortByAlphaOptions } from "@/models/form";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

type DiaryViewProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata({
  params,
}: DiaryViewProps): Promise<Metadata> {
  const diaryId = (await params).id;
  const iso = convertDateIdToValidDate(diaryId) as string;
  const date = createLocaleString(iso, "med");

  return {
    title: `My diary for ${date} | Birdiary`,
  };
}

export default async function DiaryDetailsView({
  params,
  searchParams,
}: DiaryViewProps) {
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
      <SignedOffBanner />
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
            pendingVariant="list"
            tag="sightings"
            page={parsedPage}
            sortBy={sortBy}
            defaultSortOption={defaultSortOption}
            sortOptions={sortOptions}
          />
        ) : (
          <ErrorDisplay statusCode={400} />
        )}
      </ViewWrapper>
    </>
  );
}
