// Fetch bird data from the server in RSC using name param
// Fetch sightings data for bird from client

import { BASE_URL } from "@/constants/env";
import type { SingleBird } from "@/types/models";
import { ExpectedServerError } from "@/types/api";

type BirdDetailsParams = {
  params: {
    name: string;
  };
};

export default async function BirdDetails({ params }: BirdDetailsParams) {
  const { name } = await params;

  // `name` param has an underscore "_" char in place of empty space " "
  const filteredName = name.replace("_", " ");

  // Send to 404 if `name` is not a known bird name
  // Fetch bird data
  const response = await fetch(BASE_URL + "/birdss/" + filteredName);
  const data: SingleBird | ExpectedServerError = await response.json();

  return (
    <>
      <h1>Name of bird</h1>
      <p>Bird image</p>
      <p>Bird details</p>
      <p>List of sightings</p>
    </>
  );
}
