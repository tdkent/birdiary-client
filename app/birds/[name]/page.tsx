import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import birdNames from "@/data/birds";
import type { Bird } from "@/models/db";
import { SortValues, sortByDateOptions } from "@/models/form";
import {
  apiRoutes,
  type ServerResponseWithError,
  type ServerResponseWithObject,
} from "@/models/api";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import BirdDetails from "@/components/pages/bird/BirdDetails";
import CsrList from "@/components/pages/shared/CsrList";

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

  if (!birdIdx) {
    return (
      <>
        <p>Could not find &apos;{filteredName}&apos;</p>
        <Link href="/birds">See all birds</Link>
      </>
    );
  }

  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/birds/${name}?page=1&sortBy=dateDesc`);
  }

  const birdId = birdIdx + 1;
  const response = await fetch(apiRoutes.getBird(birdId));
  const result: ServerResponseWithObject | ServerResponseWithError =
    await response.json();

  if ("error" in result) {
    const errorData = result as ServerResponseWithError;
    const msg = Array.isArray(errorData.message)
      ? errorData.message[0]
      : errorData.message;
    return <ErrorDisplay msg={msg} />;
  }

  const birdData = result as Bird;

  const defaultOption = sortBy as SortValues;
  const sortOptions = [...sortByDateOptions];

  return (
    <>
      <Suspense>
        <BirdDetails bird={birdData} />
      </Suspense>
      <h2>Sightings</h2>
      <CsrList
        variant="birdDetail"
        route={apiRoutes.sightingByBird(birdData.commonName, page, sortBy)}
        tag="sightings"
        page={page}
        sortBy={sortBy}
        defaultOption={defaultOption}
        sortOptions={sortOptions}
      />
    </>
  );
}
