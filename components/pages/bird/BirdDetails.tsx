import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import type { SingleBird } from "@/types/models";

type BirdDetailsProps = {
  bird: SingleBird;
};

export default function BirdDetails({ bird }: BirdDetailsProps) {
  return (
    <>
      <section>
        <h1>{bird.commName}</h1>

        <figure className="w-full">
          <AspectRatio ratio={16 / 9}>
            {bird.imgUrl ? (
              <Image
                src={bird.imgUrl}
                alt={bird.commName}
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
          <p>{bird.commName}</p>
          <p>
            <i>{bird.sciName}</i>
          </p>
          <p>Family: {bird.family.name}</p>
          <p>Conservation Status: {bird.rarity}</p>
          <p>{bird.desc}</p>
        </article>
      </section>
    </>
  );
}
