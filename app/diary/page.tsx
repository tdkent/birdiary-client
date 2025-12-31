import CsrList from "@/components/pages/shared/CsrList";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { getUserProfileOrNull } from "@/helpers/auth";
import { checkValidParamInteger } from "@/helpers/data";
import { ErrorMessages } from "@/types/error-messages.enum";
import {
  type SortValues,
  sortByDateOptions,
  sortBySightingsCount,
} from "@/types/list-sort.types";
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

  const route = `/sightings?groupBy=date&page=${parsedPage}&sortBy=${sortBy}`;

  return (
    <>
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
            route={route}
            sortBy={sortBy}
            sortOptions={sortOptions}
            tag="diary"
            variant="diary"
          />
        ) : (
          <ErrorDisplay msg={ErrorMessages.BadRequest} />
        )}
      </ViewWrapper>
    </>
  );
}
