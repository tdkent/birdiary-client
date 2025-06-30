// Fetch bird data from the server in RSC using name param
// Fetch sightings data for bird from client

import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BASE_URL } from "@/constants/env";
import birdNames from "@/data/birds";
import {
  // SingleBird,
  SortValues,
  // SortOptions,
  BirdWithFamily,
  sortByDateOptions,
} from "@/types/models";
import {
  apiRoutes,
  type ExpectedServerError,
  type QuerySuccess,
} from "@/types/api";
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
  const { page, sortBy } = await searchParams;

  if (!page || !sortBy) {
    redirect(`/birds/${name}?page=1&sortBy=dateDesc`);
  }

  const defaultOption = sortBy as SortValues;
  const sortOptions = [...sortByDateOptions];

  // `name` param has an underscore "_" char in place of empty space " "
  const filteredName = name.replace("_", " ");

  const findBird = birdNames.find(
    (name) => name.toLowerCase() === filteredName.toLowerCase(),
  );

  if (!findBird) {
    return (
      <>
        <p>Could not find &apos;{filteredName}&apos;</p>
        <Link href="/birds">See all birds</Link>
      </>
    );
  }

  // Fetch bird data
  const response = await fetch(BASE_URL + apiRoutes.birdDetails(findBird));
  const result: QuerySuccess | ExpectedServerError = await response.json();

  if (!response.ok) {
    const errorData = result as ExpectedServerError;
    const msg = Array.isArray(errorData.message)
      ? errorData.message[0]
      : errorData.message;
    return <ErrorDisplay msg={msg} />;
  }

  const data = result as QuerySuccess;
  const birdData = data.data as BirdWithFamily;

  return (
    <>
      <Suspense>
        <BirdDetails bird={birdData} />
      </Suspense>
      <h2>Sightings</h2>
      <CsrList
        variant="birdDetail"
        route={apiRoutes.sightingByBird(birdData.commName, page, sortBy)}
        tag="sightings"
        page={page}
        sortBy={sortBy}
        defaultOption={defaultOption}
        sortOptions={sortOptions}
      />
    </>
  );
}
