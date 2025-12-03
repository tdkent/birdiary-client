"use client";

import { useLogo } from "@/context/LogoContext";
import Image from "next/image";

/** Birdiary logo and header text with link to Home. */
export default function Logo() {
  const { img, alt } = useLogo();
  return (
    <>
      <div className="flex items-center gap-3 md:gap-4">
        <div
          className={`relative h-14 w-14 rounded-full border border-foreground md:h-16 md:w-16`}
        >
          <Image
            src={`/icon/${img}.webp`}
            alt={alt}
            fill
            sizes="(max-width: 768px) 48px, 64px"
            className="rounded-full object-cover"
          />
        </div>
        <span
          className={`font-script text-4xl antialiased max-[480px]:hidden md:text-5xl`}
        >
          Birdiary
        </span>
      </div>
    </>
  );
}
