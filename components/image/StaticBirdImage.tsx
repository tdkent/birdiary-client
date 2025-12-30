import BirdImageDisplay from "@/components/image/BirdImageDisplay";
import type { Bird } from "@/types/bird.types";
import { CircleAlert } from "lucide-react";

type BirdImageProps = {
  bird: Bird;
  sizes: string;
};

export default function StaticBirdImage({ bird, sizes }: BirdImageProps) {
  const { imgSecureUrl } = bird;

  if (!imgSecureUrl) {
    return (
      <>
        <div className="relative flex aspect-[5/3] w-full items-center justify-center gap-2 overflow-hidden rounded-md border">
          <CircleAlert strokeWidth={1} size={28} />
          <span className="text-sm">No image available</span>
        </div>
      </>
    );
  }

  return <BirdImageDisplay bird={bird} imgUrl={imgSecureUrl} sizes={sizes} />;
}
