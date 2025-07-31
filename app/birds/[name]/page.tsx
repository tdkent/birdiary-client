import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import birdNames from "@/data/birds";
import { SortValues, sortByDateOptions } from "@/models/form";
import { apiRoutes } from "@/models/api";
import BirdDetails from "@/components/pages/bird/BirdDetails";
import CsrList from "@/components/pages/shared/CsrList";
import Pending from "@/components/pages/shared/Pending";

type BirdDetailsViewParams = {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function BirdDetailsView({
  params,
  searchParams,
}: BirdDetailsViewParams) {
  const { name } = await params;

  const filteredName = name.replaceAll("_", " ").toLowerCase();
  const birdIdx = birdNames.findIndex(
    (bird) => bird.toLowerCase() === filteredName,
  );

  if (birdIdx === -1) {
    return (
      <>
        <p>Could not find &apos;{filteredName}&apos;</p>
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
        route={apiRoutes.sightingsListByType(
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
