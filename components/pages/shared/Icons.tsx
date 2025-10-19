"use client";

import {
  DESKTOP_REMAINING_COUNT,
  MOBILE_REMAINING_COUNT,
} from "@/constants/constants";
import { Messages } from "@/models/api";
import type { ListVariant } from "@/models/display";
import { Bird, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

type IconsProps =
  | {
      commonName?: never;
      count: number;
      listVariant?: never;
      imgSecureUrl?: never;
      sightingId?: never;
      sightings: string[];
      variant: "multi";
    }
  | {
      commonName: string;
      count?: never;
      imgSecureUrl: string | null;
      listVariant: ListVariant;
      sightingId: number;
      sightings?: never;
      variant: "single";
    };

export default function Icons({
  commonName,
  count,
  imgSecureUrl,
  listVariant,
  sightingId,
  sightings,
  variant,
}: IconsProps) {
  const matches = useMediaQuery("(min-width:640px)");
  const leftAlignSubtext = ["diaryDetail", "birds"];
  switch (variant) {
    case "multi": {
      const iconsToShow = matches
        ? DESKTOP_REMAINING_COUNT
        : MOBILE_REMAINING_COUNT;
      const remainingCount = count - iconsToShow;
      return (
        <>
          <div className="flex grow justify-end sm:gap-1 md:w-3/5 md:grow-0 lg:gap-2">
            {sightings.slice(0, iconsToShow).map((sighting) => {
              const [sightingId, commonName, imgSecureUrl] =
                sighting.split(",");
              //? For birds w/o an image imgSecureUrl is coalesced to 'null'
              return (
                <React.Fragment key={sightingId}>
                  <div
                    className={`relative ml-[-20px] flex aspect-square w-14 items-center justify-center overflow-hidden rounded-full border bg-background ${imgSecureUrl === "null" ? "icon-crosshatch" : "bg-background"} sm:ml-[-10px] md:w-16`}
                  >
                    {imgSecureUrl === "null" ? (
                      <>
                        <Bird
                          strokeWidth={1.5}
                          size={40}
                          className="fill-primary"
                        />
                      </>
                    ) : (
                      <>
                        <Image
                          alt={commonName}
                          className="object-cover"
                          fill
                          src={imgSecureUrl}
                          quality={30}
                        />
                      </>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
            {remainingCount >= 1 && (
              <>
                <div className="relative ml-[-20px] flex aspect-square w-14 items-center justify-center overflow-hidden rounded-full border bg-gray-100 dark:bg-blue-950 sm:ml-[-10px] md:w-16">
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
            className={`ml-4 flex w-fit justify-end sm:gap-1 md:grow-0 lg:gap-2 ${leftAlignSubtext.includes(listVariant) ? "" : "md:w-1/5 lg:w-1/4"}`}
            key={sightingId}
          >
            <React.Fragment>
              <div
                className={`relative flex aspect-square w-14 items-center justify-center overflow-hidden rounded-full border ${imgSecureUrl ? "bg-background" : "icon-crosshatch"} md:w-16`}
              >
                {imgSecureUrl ? (
                  <>
                    <Image
                      alt={commonName}
                      className="object-cover"
                      fill
                      src={imgSecureUrl}
                      quality={30}
                    />
                  </>
                ) : (
                  <>
                    <Bird
                      strokeWidth={1.5}
                      size={40}
                      className="fill-primary"
                    />
                  </>
                )}
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
