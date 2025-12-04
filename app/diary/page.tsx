import CsrList from "@/components/pages/shared/CsrList";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import SignedOffBanner from "@/components/pages/shared/SignedOffBanner";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { getUserProfileOrNull } from "@/helpers/auth";
import { checkValidParamInteger } from "@/helpers/data";
import { apiRoutes } from "@/models/api";
import {
  type SortValues,
  sortByDateOptions,
  sortBySightingsCount,
} from "@/models/form";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUserProfileOrNull();
  return {
    title: `${user && user.name ? `${user.name}'s` : "My"} birdwatching diary - Birdiary`,
    description:
      "View your birdwatching diary with all sightings grouped by date. Sort diary entires by date or count of bird sightings. Click on any entry for full details.",
  };
}

export default async function DiaryView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/diary?page=${page || "1"}&sortBy=${sortBy || "dateDesc"}`);
  }

  const user = await getUserProfileOrNull();
  const favBirdId = user && user.favoriteBirdId;

  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByDateOptions, sortBySightingsCount];
  const defaultSortOption = sortBy as SortValues;

  return (
    <>
      <SignedOffBanner />
      <ViewWrapper>
        <ViewHeader
          headingText={`${user && user.name ? `${user.name}'s` : "My"} Birding Diary`}
        />
        {parsedPage && sortOptions.find((option) => option.value === sortBy) ? (
          <CsrList
            defaultSortOption={defaultSortOption}
            favBirdId={favBirdId}
            page={parsedPage}
            pendingVariant="list"
            route={apiRoutes.getSightingsGroupByType(
              "date",
              parsedPage,
              sortBy,
            )}
            sortBy={sortBy}
            sortOptions={sortOptions}
            tag="diary"
            variant="diary"
          />
        ) : (
          <ErrorDisplay statusCode={400} />
        )}
      </ViewWrapper>
    </>
  );
}
