import BirdDetails from "@/components/pages/bird/BirdDetails";
import CsrList from "@/components/pages/shared/CsrList";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Separator } from "@/components/ui/separator";
import { BIRD_COUNT } from "@/constants/constants";
import birdNames from "@/data/birds";
import { checkValidParamInteger } from "@/helpers/data";
import { apiRoutes } from "@/models/api";
import { SortValues, sortByDateOptions } from "@/models/form";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type BirdDetailsViewParams = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function BirdDetailsView({
  params,
  searchParams,
}: BirdDetailsViewParams) {
  const { id } = await params;
  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/birds/${id}?page=${page || "1"}&sortBy=${sortBy || "dateDesc"}`);
  }

  const validBirdId =
    checkValidParamInteger(id) && Number(id) <= BIRD_COUNT ? Number(id) : null;
  const parsedPage = checkValidParamInteger(page);
  const sortOptions = [...sortByDateOptions];
  const defaultSortOption = sortBy as SortValues;

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          backLinkHref="birds"
          backLinkText="Go to birdpedia"
          descriptionText="Information on this species, along with your recorded observations"
          headingText={
            validBirdId ? birdNames[validBirdId - 1] : "Bird Details"
          }
        />
        {validBirdId &&
        parsedPage &&
        sortOptions.find((option) => option.value === sortBy) ? (
          <>
            <Suspense fallback={<Pending variant="bird" />}>
              <BirdDetails
                birdId={validBirdId}
                currBirdName={birdNames[validBirdId - 1]}
              />
            </Suspense>
            <Separator className="mx-auto w-4/5" />
            <CsrList
              defaultSortOption={defaultSortOption}
              headingText="Sightings"
              page={parsedPage}
              pendingVariant="card"
              route={apiRoutes.getSightingsListByType(
                "birdId",
                validBirdId,
                parsedPage,
                sortBy,
              )}
              sortBy={sortBy}
              sortOptions={sortOptions}
              tag="sightings"
              variant="birdDetail"
            />
          </>
        ) : (
          <ErrorDisplay statusCode={400} />
        )}
      </ViewWrapper>
    </>
  );
}
