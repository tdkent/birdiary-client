import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import birdNames from "@/data/birds";
import { SortValues, sortByDateOptions } from "@/models/form";
import { apiRoutes } from "@/models/api";
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
    (bird) => bird.toLowerCase() === formattedName,
  );

  if (birdIdx === -1) {
    return (
      <>
        <p>Could not find &apos;{formattedName}&apos;</p>
        <Link href="/birds">See all birds</Link>
      </>
    );
  }

  const { page, sortBy } = await searchParams;
  const sortOptions = [...sortByDateOptions];

  if (
    !page ||
    !sortBy ||
    !parseInt(page) ||
    parseInt(page) < 1 ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/birds/${name}?page=1&sortBy=dateDesc`);
  }

  const birdId = birdIdx + 1;
  const parsedPage = parseInt(page);

  return (
    <>
      <Suspense fallback={<Pending variant="bird" />}>
        <BirdDetails birdId={birdId} />
      </Suspense>
      <h2>Sightings</h2>
      <CsrList
        variant="birdDetail"
        pendingVariant="card"
        route={apiRoutes.getSightingsListByType(
          "birdId",
          birdId,
          parseInt(page),
          sortBy,
        )}
        tag="sightings"
        page={parsedPage}
        sortBy={sortBy}
        defaultSortOption={sortBy as SortValues}
        sortOptions={sortOptions}
      />
    </>
  );
}
