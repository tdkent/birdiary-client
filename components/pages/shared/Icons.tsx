import Image from "next/image";
import React from "react";

type IconsProps = {
  sightings: string[];
};

export default function Icons({ sightings }: IconsProps) {
  return (
    <>
      <div className="flex md:gap-1">
        {sightings.map((sighting) => {
          const [sightingId, commonName, imgSecureUrl] = sighting.split(",");
          return (
            <React.Fragment key={sightingId}>
              <div className="relative ml-[-20px] aspect-square w-14 overflow-hidden rounded-full shadow-md shadow-gray-800 dark:shadow-gray-900 md:m-0 md:w-16">
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
      </div>
    </>
  );
}
