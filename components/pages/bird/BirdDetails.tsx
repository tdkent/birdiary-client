import { getBird } from "@/actions/bird";
import StaticBirdImage from "@/components/image/StaticBirdImage";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type BirdDetailsProps = {
  birdId: number;
};

export default async function BirdDetails({ birdId }: BirdDetailsProps) {
  const result = await getBird(birdId);

  if ("error" in result) {
    return <ErrorDisplay statusCode={result.statusCode} />;
  }

  const { commonName, scientificName, family, rarity, description } = result;

  return (
    <>
      <section className="flex flex-col gap-4 md:w-[85%] md:gap-10">
        <StaticBirdImage
          bird={result}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 85vw, 678px"
        />
        <dl className="mt-8 flex flex-col gap-8 px-2 md:gap-12">
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Common Name
            </dt>
            <dd className="text-xl md:text-2xl">{commonName}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Scientific Name
            </dt>
            <dd className="text-xl italic md:text-2xl">{scientificName}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Family
            </dt>
            <dd className="text-xl md:text-2xl">{family}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Occurrence
            </dt>
            <dd className="text-xl md:text-2xl">{rarity}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Description
            </dt>
            <dd className="text-xl md:text-2xl">{description}</dd>
          </div>
        </dl>
      </section>
    </>
  );
}
