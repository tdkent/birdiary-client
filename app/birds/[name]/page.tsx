import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import birdNames from "@/data/birds";
import { SortValues, sortByDateOptions } from "@/models/form";
import { apiRoutes } from "@/models/api";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import BirdDetails from "@/components/pages/bird/BirdDetails";
import CsrList from "@/components/pages/shared/CsrList";
import Pending from "@/components/pages/shared/Pending";
import { formatUrlToBirdName } from "@/helpers/data";

type BirdDetailsViewParams = {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function BirdDetailsView({
  params,
  searchParams,
}: BirdDetailsViewParams) {
  const { name } = await params;

  const formattedName = formatUrlToBirdName(name).toLowerCase();
  const birdIdx = birdNames.findIndex(
    (bird) => bird.replaceAll(`'`, "").toLowerCase() === formattedName,
  );

  if (birdIdx === -1) notFound();

  const { page, sortBy } = await searchParams;
  const sortOptions = [...sortByDateOptions];
  const parsedPage = Number(page);

  if (
    !page ||
    !sortBy ||
    !parsedPage ||
    parsedPage < 1 ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/birds/${name}?page=1&sortBy=dateDesc`);
  }

  const birdId = birdIdx + 1;
  const currBirdName = birdNames[birdIdx];

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          backLinkHref="birds"
          backLinkText="Go to birdpedia"
          descriptionText="Information on this species, along with your recorded observations"
          headingText={currBirdName}
        />
        <Suspense fallback={<Pending variant="bird" />}>
          <BirdDetails birdId={birdId} currBirdName={currBirdName} />
        </Suspense>
        <Separator className="mx-auto w-4/5" />
        <CsrList
          defaultSortOption={sortBy as SortValues}
          headingText="Sightings"
          page={parsedPage}
          pendingVariant="card"
          route={apiRoutes.getSightingsListByType(
            "birdId",
            birdId,
            parsedPage,
            sortBy,
          )}
          sortBy={sortBy}
          sortOptions={sortOptions}
          tag="sightings"
          variant="birdDetail"
        />
      </ViewWrapper>
    </>
  );
}
