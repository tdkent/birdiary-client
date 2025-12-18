import CsrList from "@/components/pages/shared/CsrList";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { getUserProfileOrNull } from "@/helpers/auth";
import { checkValidParamInteger } from "@/helpers/data";
import { convertDateIdToValidDate, createLocaleString } from "@/helpers/dates";
import { apiRoutes, Messages } from "@/models/api";
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
  const user = await getUserProfileOrNull();

  return {
    title: `${user && user.name ? `${user.name}'s` : "My"} diary on ${localeStr} - Birdiary`,
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

  const user = await getUserProfileOrNull();
  const favBirdId = user && user.favoriteBirdId;

  const validDateId = convertDateIdToValidDate(id);
  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions];
  const defaultSortOption = sortBy as SortValues;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          backLinkHref="diary"
          backLinkText="Go to my diary"
          headingText={`${user && user.name ? `${user.name}'s` : "My"} Birding Diary: ${validDateId ? createLocaleString(validDateId, "med") : "Invalid URL"}`}
        />
        {validDateId &&
        parsedPage &&
        sortOptions.find((option) => option.value === sortBy) ? (
          <CsrList
            defaultSortOption={defaultSortOption}
            favBirdId={favBirdId}
            page={parsedPage}
            pendingVariant="list"
            route={apiRoutes.getSightingsListByType(
              "dateId",
              validDateId,
              parsedPage,
              sortBy,
            )}
            sortBy={sortBy}
            sortOptions={sortOptions}
            tag="sightings"
            variant="diaryDetail"
          />
        ) : (
          <ErrorDisplay msg={Messages.BadRequest} />
        )}
      </ViewWrapper>
    </>
  );
}
