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

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Diary"
          descriptionText="View a list of your sightings grouped by date."
        />
        {parsedPage && sortOptions.find((option) => option.value === sortBy) ? (
          <CsrList
            route={apiRoutes.getSightingsGroupByType(
              "date",
              parsedPage,
              sortBy,
            )}
            variant="diary"
            pendingVariant="listSingleRow"
            tag="diary"
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
