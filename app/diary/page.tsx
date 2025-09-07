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
import { checkValidParamInteger } from "@/helpers/data";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

export default async function DiaryView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/diary?page=${page || "1"}&sortBy=${sortBy || "dateDesc"}`);
  }

  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByDateOptions, sortBySightingsCount];
  const defaultSortOption = sortBy as SortValues;

  if (
    !parsedPage ||
    (sortOptions && !sortOptions.find((option) => option.value === sortBy))
  ) {
    return (
      <>
        <ViewWrapper>
          <ViewHeader
            headingText="Life List"
            descriptionText="View your complete North American birdwatching life list."
            backLinkHref="sightings"
            backLinkText="Go to sightings"
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
          headingText="Diary"
          descriptionText="View a list of your sightings grouped by date."
        />
        <CsrList
          route={apiRoutes.getSightingsGroupByType("date", page, sortBy)}
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
