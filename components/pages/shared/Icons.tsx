import Image from "next/image";
import React from "react";

type IconsProps = {
  sightings: string[];
};

export default function Icons({ sightings }: IconsProps) {
  return (
    <>
      <div className="flex">
        {sightings.map((sighting) => {
          const [sightingId, commonName, imgSecureUrl] = sighting.split(",");
          return (
            <React.Fragment key={sightingId}>
              <div className="relative ml-[-16px] aspect-square w-14 overflow-hidden rounded-full border border-black">
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
