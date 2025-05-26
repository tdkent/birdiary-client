// Fetch bird data from the server in RSC using name param
// Fetch sightings data for bird from client

import { Suspense } from "react";
import Link from "next/link";
import { BASE_URL } from "@/constants/env";
import birdNames from "@/data/birds";
import type {
  // SingleBird,
  // SortValues,
  // SortOptions,
  BirdWithFamily,
} from "@/types/models";
import { ExpectedServerError, QuerySuccess } from "@/types/api";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import BirdDetails from "@/components/pages/bird/BirdDetails";
import CsrList from "@/components/pages/shared/CsrList";
import { apiRoutes } from "@/types/api";

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

  // Define options for `SortList` component
  // const defaultSort: SortValues = "dateDesc";
  // const sortOptions: SortOptions = [
  //   { value: "dateDesc", text: "Newest - Oldest" },
  //   { value: "dateAsc", text: "Oldest - Newest" },
  // ];

  return (
    <>
      <Suspense>
        <BirdDetails bird={birdData} />
      </Suspense>
      <h2>Sightings</h2>
      <CsrList
        variant="birdDetail"
        route={apiRoutes.sightingByBird(birdData.commName)}
        tag="sightings"
      />
    </>
  );
}
