import { getBird } from "@/actions/bird";
import BirdDetails from "@/components/pages/bird/BirdDetails";
import FavoriteBird from "@/components/pages/bird/FavoriteBird";
import CsrList from "@/components/pages/shared/CsrList";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import Pending, { ButtonSkeleton } from "@/components/pages/shared/Pending";
import SignedOffBanner from "@/components/pages/shared/SignedOffBanner";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Separator } from "@/components/ui/separator";
import { BIRD_COUNT } from "@/constants/constants";
import birdNames from "@/data/birds";
import { checkValidParamInteger } from "@/helpers/data";
import { apiRoutes } from "@/models/api";
import { Bird } from "@/models/db";
import { SortValues, sortByDateOptions } from "@/models/form";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type BirdDetailsViewProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata({
  params,
}: BirdDetailsViewProps): Promise<Metadata> {
  const birdId = (await params).id;
  const bird = (await getBird(Number(birdId))) as Bird;

  return {
    title: `${bird.commonName} | Birdiary`,
    description: bird.description,
  };
}

export default async function BirdDetailsView({
  params,
  searchParams,
}: BirdDetailsViewProps) {
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
      <SignedOffBanner />
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
            <Suspense fallback={<Pending variant="birdDetails" />}>
              <BirdDetails birdId={validBirdId} />
            </Suspense>
            <Suspense fallback={<ButtonSkeleton />}>
              <FavoriteBird birdId={validBirdId} />
            </Suspense>
            <Separator className="mx-auto w-4/5" />
            <CsrList
              defaultSortOption={defaultSortOption}
              headingText="Sightings"
              page={parsedPage}
              pendingVariant="list"
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
