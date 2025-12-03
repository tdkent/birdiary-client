"use client";

import Image from "next/image";

type LogoProps = {
  logoStyles: string;
  textStyles: string;
};

/** Birdiary logo and header text with link to Home. */
export default function Logo({ logoStyles, textStyles }: LogoProps) {
  return (
    <>
      <div className="flex items-center gap-3 md:gap-4">
        <div
          className={`relative rounded-full border border-foreground ${logoStyles}`}
        >
          <Image
            src="/icon/Northern-Cardinal.webp"
            alt="Northern Cardinal"
            fill
            sizes="(max-width: 768px) 48px, 64px"
            className="rounded-full object-cover"
          />
        </div>
        <span className={`font-script antialiased ${textStyles}`}>
          Birdiary
        </span>
      </div>
    </>
  );
}
