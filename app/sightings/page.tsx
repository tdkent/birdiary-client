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

export default async function SightingsView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;
  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];

  if (
    !page ||
    !sortBy ||
    !parseInt(page) ||
    parseInt(page) < 1 ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/sightings?page=1&sortBy=dateDesc`);
  }

  const defaultSortOption = sortBy as SortValues;
  const parsedPage = parseInt(page);

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Sightings"
          descriptionText="View a list of all your sightings sorted by date or bird."
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
