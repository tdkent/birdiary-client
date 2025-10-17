"use client";

import {
  DESKTOP_REMAINING_COUNT,
  MOBILE_REMAINING_COUNT,
} from "@/constants/constants";
import { Messages } from "@/models/api";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

type IconsProps =
  | {
      commonName?: never;
      count: number;
      imgSecureUrl?: never;
      sightingId?: never;
      sightings: string[];
      variant: "multi";
    }
  | {
      commonName: string;
      count?: never;
      imgSecureUrl: string | null;
      sightingId: number;
      sightings?: never;
      variant: "single";
    };

export default function Icons({
  commonName,
  count,
  imgSecureUrl,
  sightingId,
  sightings,
  variant,
}: IconsProps) {
  const matches = useMediaQuery("(min-width:640px)");

  switch (variant) {
    case "multi": {
      const iconsToShow = matches
        ? DESKTOP_REMAINING_COUNT
        : MOBILE_REMAINING_COUNT;
      const remainingCount = count - iconsToShow;
      return (
        <>
          <div className="flex grow justify-end pr-4 sm:gap-1 md:w-3/5 md:grow-0 lg:gap-2">
            {sightings.slice(0, iconsToShow).map((sighting) => {
              const [sightingId, commonName, imgSecureUrl] =
                sighting.split(",");
              return (
                <React.Fragment key={sightingId}>
                  <div className="relative ml-[-20px] aspect-square w-14 overflow-hidden rounded-full bg-background shadow-md shadow-gray-800 dark:shadow-gray-900 sm:ml-[-10px] md:w-16">
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
                <div className="relative ml-[-20px] flex aspect-square w-14 items-center justify-center overflow-hidden rounded-full bg-gray-100 shadow-md shadow-gray-800 dark:bg-blue-950 dark:shadow-gray-900 sm:ml-[-10px] md:w-16">
                  <p className="flex items-center gap-1 text-2xl text-foreground">
                    <Plus className="m-[-6px]" strokeWidth={2} size={16} />
                    <span className="font-numbers">{remainingCount}</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </>
      );
    }

    case "single": {
      return (
        <>
          <div
            className="ml-4 flex w-fit justify-end pr-2 sm:gap-1 md:w-1/5 md:grow-0 lg:w-1/4 lg:gap-2"
            key={sightingId}
          >
            <React.Fragment>
              <div className="relative aspect-square w-14 overflow-hidden rounded-full bg-background shadow-md shadow-gray-800 dark:shadow-gray-900 md:w-16">
                <Image
                  alt={commonName}
                  className="object-cover"
                  fill
                  src={imgSecureUrl}
                  quality={30}
                />
              </div>
            </React.Fragment>
          </div>
        </>
      );
    }

    default:
      throw new Error(Messages.InvalidSwitchCase);
  }
}
