import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { Bird } from "@/models/db";

type BirdImageProps = {
  bird: Bird;
};
export default function BirdImage({ bird }: BirdImageProps) {
  return (
    <>
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
    </>
  );
}
