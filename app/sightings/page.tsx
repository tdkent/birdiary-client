import CsrList from "@/components/pages/shared/CsrList";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { getUserProfileOrNull } from "@/helpers/auth";
import { checkValidParamInteger } from "@/helpers/data";
import { apiRoutes } from "@/models/api";
import {
  sortByAlphaOptions,
  sortByDateOptions,
  SortValues,
} from "@/models/form";
import { ErrorMessages } from "@/types/error-messages.enum";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUserProfileOrNull();

  return {
    title: `${user && user.name ? `${user.name}'s` : "My"} bird sightings - Birdiary`,
    description:
      "View all your recorded bird sightings in one place. Sort sightings by date or bird. Click on any sighting for full details.",
  };
}

export default async function SightingsView({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/sightings?page=${page || "1"}&sortBy=${sortBy || "dateDesc"}`);
  }

  const user = await getUserProfileOrNull();
  const favBirdId = user && user.favoriteBirdId;

  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByAlphaOptions, ...sortByDateOptions];
  const defaultSortOption = sortBy as SortValues;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText={`${user && user.name ? `${user.name}'s` : "My"} Bird Sightings`}
          backLinkHref="lifelist"
          backLinkText="Go to my life list"
        />
        {parsedPage && sortOptions.find((option) => option.value === sortBy) ? (
          <>
            <CsrList
              defaultSortOption={defaultSortOption}
              favBirdId={favBirdId}
              page={parsedPage}
              pendingVariant="list"
              route={apiRoutes.getSightings(parsedPage, sortBy)}
              sortBy={sortBy}
              sortOptions={sortOptions}
              tag="sightings"
              variant="sighting"
            />
          </>
        ) : (
          <>
            <ErrorDisplay msg={ErrorMessages.BadRequest} />
          </>
        )}
      </ViewWrapper>
    </>
  );
}
