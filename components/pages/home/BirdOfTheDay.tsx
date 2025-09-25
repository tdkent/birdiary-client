import BirdImage from "@/components/forms/BirdImage";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { apiRoutes, ExpectedServerError } from "@/models/api";
import { Bird } from "@/models/db";

/** Bird display updated daily. */
export default async function BirdOfTheDay() {
  const response = await fetch(apiRoutes.birdOfTheDay);
  const result: Bird | ExpectedServerError = await response.json();
  if ("error" in result) {
    return <ErrorDisplay statusCode={result.statusCode} />;
  }
  return (
    <section className="my-4 flex flex-col gap-2 rounded-md border p-2">
      <h3>Bird of the Day</h3>
      <BirdImage
        currBirdName={result.commonName}
        sizes="(max-width: 1024px) 100vw, 780px"
      />
      <p className="text-sm">Your sightings: No sightings yet!</p>
    </section>
  );
}
