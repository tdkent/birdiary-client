// Fetch bird data from the server in RSC using name param
// Fetch sightings data for bird from client

import { Suspense } from "react";
import Link from "next/link";
import { BASE_URL } from "@/constants/env";
import birdNames from "@/data/birds";
import type { SingleBird } from "@/types/models";
import { ExpectedServerError, QuerySuccess } from "@/types/api";
import ErrorDisplay from "@/components/pages/ErrorDisplay";
import BirdDetails from "@/components/pages/birds/BirdDetails";
import SightingListGeneric from "@/components/pages/SightingListGeneric";

type BirdDetailsViewParams = {
  params: {
    name: string;
  };
};

export default async function BirdDetailsView({
  params,
}: BirdDetailsViewParams) {
  const { name } = await params;

  // `name` param has an underscore "_" char in place of empty space " "
  const filteredName = name.replace("_", " ");

  // Render error if `name` is not a known bird
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
  const response = await fetch(BASE_URL + "/birds/" + findBird);
  const data: QuerySuccess<SingleBird> | ExpectedServerError =
    await response.json();

  if (!response.ok) {
    // `data` will be ExpectedServerError type if server sends an error
    const msg = Array.isArray(data.message) ? data.message[0] : data.message;
    return <ErrorDisplay msg={msg} />;
  }

  const birdData = data as QuerySuccess<SingleBird>;

  return (
    <>
      <Suspense>
        <BirdDetails bird={birdData.data} />
      </Suspense>
      <h2>Sightings</h2>
      <SightingListGeneric
        route={"/sightings/bird/" + birdData.data.commName}
        heading="date"
      />
    </>
  );
}
