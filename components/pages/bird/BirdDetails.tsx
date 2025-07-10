import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import type { Bird } from "@/models/db";

type BirdDetailsProps = {
  bird: Bird;
};

export default function BirdDetails({ bird }: BirdDetailsProps) {
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
          <figcaption className="text-xs">{bird.imgAttr}</figcaption>
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
