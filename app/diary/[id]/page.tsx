import CsrList from "@/components/pages/shared/CsrList";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import SignedOffBanner from "@/components/pages/shared/SignedOffBanner";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { getUsername } from "@/helpers/auth";
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
  const { id: diaryId } = await params;
  const isoStr = convertDateIdToValidDate(diaryId);

  if (!isoStr) {
    return {
      title: "My diary - Birdiary",
    };
  }

  const localeStr = createLocaleString(isoStr, "med");
  const username = await getUsername();

  return {
    title: `${username ? `${username}'s` : "My"} diary on ${localeStr} - Birdiary`,
    description: `View your personal birdwatching diary on ${localeStr}, including a list with each bird sighting.`,
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

  const username = await getUsername();

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
          backLinkText="Go to my diary"
          headingText={`${username ? `${username}'s` : "My"} Birding Diary: ${validDateId ? createLocaleString(validDateId, "med") : "Invalid URL"}`}
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
