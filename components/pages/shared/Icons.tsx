"use client";

import { useAuth } from "@/context/AuthContext";
import type { ListVariant } from "@/models/display";
import { Bird, Heart, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useMediaQuery } from "usehooks-ts";

type IconsProps =
  | {
      commonName?: never;
      favBirdId?: number | null;
      isFavBird?: never;
      listVariant: ListVariant;
      imgSecureUrl?: never;
      sightingId?: never;
      sightings: string[] | null;
      variant: "multi";
    }
  | {
      commonName: string;
      favBirdId?: never;
      imgSecureUrl: string | null;
      isFavBird?: boolean;
      listVariant: ListVariant;
      sightingId: number;
      sightings?: never;
      variant: "single";
    };

export default function Icons({
  commonName,
  favBirdId,
  imgSecureUrl,
  isFavBird,
  listVariant,
  sightingId,
  sightings,
  variant,
}: IconsProps) {
  const { isSignedIn } = useAuth();
  const matches = useMediaQuery("(min-width:640px)");
  const tablet = useMediaQuery("(min-width:768px)");

  const MAX_ICONS_TO_DISPLAY_MOBILE = 3;
  const MAX_ICONS_TO_DISPLAY_DESKTOP = MAX_ICONS_TO_DISPLAY_MOBILE + 1;

  const doNotShow =
    (listVariant !== "birds" && !isSignedIn) ||
    (listVariant === "locations" && !tablet);
  if (doNotShow) return null;

  const leftAlignSubtext = ["diaryDetail", "birds", "lifeList"];

  switch (variant) {
    case "multi": {
      if (!sightings) return null;

      const distinctBirdCount = sightings.length;
      const iconsToShow = matches
        ? MAX_ICONS_TO_DISPLAY_DESKTOP
        : MAX_ICONS_TO_DISPLAY_MOBILE;
      const remainingCount = distinctBirdCount - iconsToShow;
      const remainingCountFontSize =
        remainingCount >= 100
          ? "text-lg"
          : remainingCount >= 1000
            ? "text-base"
            : "text-xl";
      return (
        <>
          <div
            className={`flex grow justify-end sm:gap-1 ${listVariant === "locations" ? "md:min-w-[336px]" : "md:w-3/5"} md:grow-0 lg:gap-2`}
          >
            {sightings.slice(0, iconsToShow).map((sighting) => {
              const [commonName, birdId, imgSecureUrl] = sighting.split(",");
              const birdIdInt = Number(birdId);
              const isFavBird = birdIdInt === favBirdId;
              //? For birds w/o an image imgSecureUrl is coalesced to "null"
              return (
                <React.Fragment key={birdIdInt}>
                  <div className="relative">
                    <div
                      className={`relative ml-[-8px] flex aspect-square w-14 items-center justify-center overflow-hidden rounded-full border bg-background ${imgSecureUrl === "null" ? "icon-crosshatch" : "bg-background"} md:w-16`}
                    >
                      <Icon
                        commonName={commonName}
                        imgSecureUrl={imgSecureUrl}
                      />
                    </div>
                    {isFavBird && (
                      <Heart
                        className="absolute bottom-0.5 right-1 size-5 shrink-0 grow-0 fill-fuchsia-400/90 text-fuchsia-300/90 sm:right-0 md:size-6"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                </React.Fragment>
              );
            })}
            {remainingCount >= 1 && (
              <>
                <div className="relative ml-[-8px] flex aspect-square w-14 items-center justify-center overflow-hidden rounded-full border bg-gray-100 dark:bg-blue-950 md:w-16">
                  <p
                    className={`flex items-center gap-1 text-foreground ${remainingCountFontSize}`}
                  >
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
            className={`relative ml-4 flex w-fit justify-end sm:gap-1 md:grow-0 lg:gap-2 ${leftAlignSubtext.includes(listVariant) ? "" : "md:w-1/5 lg:w-1/4"}`}
            key={sightingId}
          >
            <div
              className={`relative flex aspect-square w-14 items-center justify-center overflow-hidden rounded-full border ${imgSecureUrl ? "bg-background" : "icon-crosshatch"} md:w-16`}
            >
              <Icon commonName={commonName} imgSecureUrl={imgSecureUrl} />
            </div>
            {isFavBird && (
              <Heart
                className="absolute bottom-0.5 size-5 shrink-0 grow-0 fill-fuchsia-400/90 text-fuchsia-300/90 md:size-6"
                strokeWidth={1.5}
              />
            )}
          </div>
        </>
      );
    }

    default:
      throw new Error();
  }
}

type IconProps = {
  commonName: string;
  imgSecureUrl: string | null;
};

function Icon({ commonName, imgSecureUrl }: IconProps) {
  const [loading, setLoading] = useState(true);

  if (!imgSecureUrl || imgSecureUrl === "null") {
    return (
      <>
        <Bird strokeWidth={1.5} size={40} className="fill-primary" />
      </>
    );
  }

  return (
    <>
      {loading ? <Bird strokeWidth={1.5} size={32} /> : null}
      <Image
        alt={commonName}
        className="object-cover"
        fill
        quality={30}
        onLoad={() => setLoading(false)}
        sizes="(max-width: 768px) 56px, 64px"
        src={imgSecureUrl}
      />
    </>
  );
}
