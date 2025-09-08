import { redirect } from "next/navigation";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import CsrList from "@/components/pages/shared/CsrList";
import { apiRoutes } from "@/models/api";
import {
  sortByAlphaOptions,
  sortByDateOptions,
  SortValues,
} from "@/models/form";
import { checkValidParamInteger } from "@/helpers/data";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

export default async function SightingsView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;
  if (!page || !sortBy) {
    redirect(`/sightings?page=${page || "1"}&sortBy=${sortBy || "dateDesc"}`);
  }

  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];

  if (
    !parsedPage ||
    (sortOptions && !sortOptions.find((option) => option.value === sortBy))
  ) {
    return (
      <>
        <ViewWrapper>
          <ViewHeader
            headingText="Sightings"
            descriptionText="View a list of all your sightings sorted by date or bird."
            backLinkHref="lifelist"
            backLinkText="Go to life list"
          />
          <ErrorDisplay msg="Invalid request." />
        </ViewWrapper>
      </>
    );
  }

  const defaultSortOption = sortBy as SortValues;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Sightings"
          descriptionText="View a list of all your sightings sorted by date or bird."
          backLinkHref="lifelist"
          backLinkText="Go to life list"
        />
        <CsrList
          variant="sighting"
          pendingVariant="listDoubleRow"
          route={apiRoutes.getSightings(parsedPage, sortBy)}
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
