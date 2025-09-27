import type { Bird } from "@/models/db";
import { CircleAlert } from "lucide-react";
import Image from "next/image";

type BirdImageProps = {
  bird: Bird;
  sizes: string;
};

export default function StaticBirdImage({ bird, sizes }: BirdImageProps) {
  const { commonName, imgUrl, imgAttribute, scientificName } = bird;

  if (!imgUrl) {
    return (
      <>
        <div className="relative flex aspect-[5/3] w-full items-center justify-center gap-2 overflow-hidden rounded-md border">
          <CircleAlert strokeWidth={1} size={28} />
          <span className="text-sm">No image available</span>
        </div>
      </>
    );
  }

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
