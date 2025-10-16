import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

type IconsProps = {
  count: number;
  sightings: string[];
};

export default function Icons({ count, sightings }: IconsProps) {
  const remainingCount = count - 3;
  return (
    <>
      <div className="flex md:gap-1">
        {sightings.map((sighting) => {
          const [sightingId, commonName, imgSecureUrl] = sighting.split(",");
          return (
            <React.Fragment key={sightingId}>
              <div className="relative ml-[-20px] aspect-square w-14 overflow-hidden rounded-full bg-background shadow-md shadow-gray-800 dark:shadow-gray-900 md:m-0 md:w-16">
                <Image
                  alt={commonName}
                  className="object-cover"
                  fill
                  src={imgSecureUrl}
                  quality={30}
                />
              </div>
            </React.Fragment>
          );
        })}
        {remainingCount >= 1 && (
          <>
            <div className="relative ml-[-20px] flex aspect-square w-14 items-center justify-center overflow-hidden rounded-full bg-gray-100 shadow-md shadow-gray-800 dark:bg-blue-950 dark:shadow-gray-900 md:m-0 md:w-16">
              <p className="flex items-center text-2xl text-foreground">
                <Plus className="m-[-2px]" strokeWidth={2} size={16} />
                <span className="font-numbers">{remainingCount}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
