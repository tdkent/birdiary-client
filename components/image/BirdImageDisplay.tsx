import { Bird } from "@/models/db";
import Image from "next/image";

type BirdImageDisplayProps = {
  bird: Bird;
  imgUrl: string;
  sizes: string;
};

export default function BirdImageDisplay({
  bird,
  imgUrl,
  sizes,
}: BirdImageDisplayProps) {
  const { commonName, imgAttribute, scientificName } = bird;
  return (
    <>
      <figure className="flex flex-col gap-1 md:gap-2">
        <div className="relative flex aspect-[5/3] w-full items-center justify-center gap-2 overflow-hidden rounded-md border">
          <Image
            alt={commonName}
            className="object-cover"
            fill
            priority
            sizes={sizes}
            src={imgUrl}
          />
        </div>
        <figcaption className="px-1 text-xs italic md:text-sm">
          {scientificName}. &copy; {imgAttribute ?? "Public Domain"}
        </figcaption>
      </figure>
    </>
  );
}
