import { getBird } from "@/actions/bird";
import StaticBirdImage from "@/components/image/StaticBirdImage";
import DescriptionListItem from "@/components/pages/shared/DescriptionListItem";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type BirdDetailsProps = {
  birdId: number;
};

export default async function BirdDetails({ birdId }: BirdDetailsProps) {
  const result = await getBird(birdId);

  if ("error" in result) {
    return <ErrorDisplay msg={result.message} />;
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
          <DescriptionListItem dt="Common Name" dd={commonName} />
          <DescriptionListItem
            dt="Scientific Name"
            dd={scientificName}
            useItalics
          />
          <DescriptionListItem dt="Family" dd={family} />
          <DescriptionListItem dt="Occurrence" dd={rarity} />
          <DescriptionListItem dt="Description" dd={description} />
        </dl>
      </section>
    </>
  );
}
