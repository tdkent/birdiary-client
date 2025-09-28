import StaticBirdImage from "@/components/image/StaticBirdImage";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import {
  apiRoutes,
  ServerResponseWithError,
  ServerResponseWithObject,
} from "@/models/api";
import type { Bird } from "@/models/db";

type BirdDetailsProps = {
  birdId: number;
};

export default async function BirdDetails({ birdId }: BirdDetailsProps) {
  const response = await fetch(apiRoutes.bird(birdId));
  const result: ServerResponseWithObject | ServerResponseWithError =
    await response.json();

  if ("error" in result) {
    return <ErrorDisplay statusCode={result.statusCode} />;
  }

  const bird = result as Bird;
  return (
    <>
      <section className="flex flex-col gap-4 md:w-[85%] md:gap-10">
        <StaticBirdImage
          bird={bird}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 85vw, 678px"
        />
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
