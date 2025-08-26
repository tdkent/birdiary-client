import BirdImage from "@/components/forms/BirdImage";
import type { Bird } from "@/models/db";
import {
  apiRoutes,
  ServerResponseWithError,
  ServerResponseWithObject,
} from "@/models/api";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type BirdDetailsProps = {
  birdId: number;
  currBirdName: string;
};

export default async function BirdDetails({
  birdId,
  currBirdName,
}: BirdDetailsProps) {
  const response = await fetch(apiRoutes.bird(birdId));
  const result: ServerResponseWithObject | ServerResponseWithError =
    await response.json();

  if ("error" in result) {
    const errorData = result as ServerResponseWithError;
    const msg = Array.isArray(errorData.message)
      ? errorData.message[0]
      : errorData.message;
    return <ErrorDisplay msg={msg} />;
  }

  const bird = result as Bird;
  return (
    <>
      <section className="flex flex-col gap-4 md:w-[85%] md:gap-10">
        <BirdImage currBirdName={currBirdName} />
        <dl className="mt-8 flex flex-col gap-8 px-2 md:gap-12">
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Common Name
            </dt>
            <dd className="text-xl md:text-2xl">{bird.commonName}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Scientific Name
            </dt>
            <dd className="text-xl italic md:text-2xl">
              {bird.scientificName}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Family
            </dt>
            <dd className="text-xl md:text-2xl">{bird.family}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Occurrence
            </dt>
            <dd className="text-xl md:text-2xl">{bird.rarity}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Description
            </dt>
            <dd className="text-xl md:text-2xl">{bird.description}</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
