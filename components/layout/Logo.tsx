import Link from "next/link";
import Image from "next/image";

const logoImgs = [
  "Blue-Jay",
  "Emperor-Goose",
  "Northern-Cardinal",
  "Painted-Bunting",
];

type LogoProps = {
  isHeader?: boolean;
};

/** Birdiary logo and header text with link to Home */
export default function Logo({ isHeader }: LogoProps) {
  const selectedImg = logoImgs[Math.floor(Math.random() * 4)];
  const imgAlt = selectedImg.split("-").join(" ");
  return (
    <>
      <Link
        href="/"
        className="flex items-center gap-3 md:gap-4"
        inert={!isHeader}
      >
        <div
          className={`relative ${isHeader ? "h-14 w-14" : "h-12 w-12"} rounded-full border border-foreground sm:h-16 sm:w-16`}
        >
          <Image
            src={`/icon/${selectedImg}.webp`}
            alt={imgAlt}
            fill
            sizes="(max-width: 768px) 48px, 64px"
            className="rounded-full object-cover"
          />
        </div>
        <span
          className={`font-playful text-3xl ${isHeader && "text-4xl"} uppercase antialiased ${isHeader && "max-[480px]:hidden"} sm:text-5xl`}
        >
          Birdiary
        </span>
      </Link>
    </>
  );
}
