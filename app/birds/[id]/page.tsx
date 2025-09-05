import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import birdNames from "@/data/birds";
import { SortValues, sortByDateOptions } from "@/models/form";
import { apiRoutes } from "@/models/api";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import BirdDetails from "@/components/pages/bird/BirdDetails";
import CsrList from "@/components/pages/shared/CsrList";
import Pending from "@/components/pages/shared/Pending";
// import { formatUrlToBirdName } from "@/helpers/data";

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

  const parsedId = Number(id);
  const parsedPage = Number(page);
  const sortOptions = [...sortByDateOptions];

  if (
    !page ||
    !sortBy ||
    !parsedId ||
    parsedId < 1 ||
    parsedId > 838 ||
    !parsedPage ||
    parsedPage < 1 ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/birds/${id}?page=1&sortBy=dateDesc`);
  }

  const currBirdName = birdNames[parsedId];

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
          <BirdDetails birdId={parsedId} currBirdName={currBirdName} />
        </Suspense>
        <Separator className="mx-auto w-4/5" />
        <CsrList
          defaultSortOption={sortBy as SortValues}
          headingText="Sightings"
          page={parsedPage}
          pendingVariant="card"
          route={apiRoutes.getSightingsListByType(
            "birdId",
            parsedId,
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
