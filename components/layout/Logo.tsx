"use client";

import { useLogo } from "@/context/LogoContext";
import Image from "next/image";

type LogoProps = {
  logoStyles: string;
  textStyles: string;
};

/** Birdiary logo and header text with link to Home. */
export default function Logo({ logoStyles, textStyles }: LogoProps) {
  const { img, alt } = useLogo();
  return (
    <>
      <div className="flex items-center gap-3 md:gap-4">
        <div
          className={`relative rounded-full border border-foreground ${logoStyles}`}
        >
          <Image
            src={`/icon/${img}.webp`}
            alt={alt}
            fill
            sizes="(max-width: 768px) 48px, 64px"
            className="rounded-full object-cover"
          />
        </div>
        <span className={`font-script uppercase antialiased ${textStyles}`}>
          Birdiary
        </span>
      </div>
    </>
  );
}
