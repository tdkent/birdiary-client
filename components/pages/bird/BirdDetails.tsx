import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import type { Bird } from "@/models/db";
import {
  apiRoutes,
  ServerResponseWithError,
  ServerResponseWithObject,
} from "@/models/api";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type BirdDetailsProps = {
  birdId: number;
};

export default async function BirdDetails({ birdId }: BirdDetailsProps) {
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
      <section>
        <h1>{bird.commonName}</h1>

        <figure className="w-full">
          <AspectRatio ratio={16 / 9}>
            {bird.imgUrl ? (
              <Image
                src={bird.imgUrl}
                alt={bird.commonName}
                className="rounded-md object-cover"
                fill
                priority
              />
            ) : (
              <p>No image</p>
            )}
          </AspectRatio>
          <figcaption className="text-xs">{bird.imgAttribute}</figcaption>
        </figure>

        <article>
          <p>{bird.commonName}</p>
          <p>
            <i>{bird.scientificName}</i>
          </p>
          <p>Family: {bird.family}</p>
          <p>Conservation Status: {bird.rarity}</p>
          <p>{bird.description}</p>
        </article>
      </section>
    </>
  );
}
