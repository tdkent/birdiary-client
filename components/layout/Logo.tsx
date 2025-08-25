import Link from "next/link";
import Image from "next/image";

/** Birdiary logo and header text with link to Home */
export default function Logo() {
  return (
    <>
      <Link href="/" className="flex items-center gap-3 md:gap-4">
        <div className="relative h-14 w-14 rounded-full border-2 border-blue-300 sm:h-16 sm:w-16">
          <Image
            src="/icon/blue-jay-icon.webp"
            alt="Blue Jay"
            fill
            sizes="(max-width: 768px) 48px, 64px"
            className="rounded-full object-cover"
          />
        </div>
        <span className="font-playful text-4xl uppercase antialiased max-[480px]:hidden sm:text-5xl">
          Birdiary
        </span>
      </Link>
    </>
  );
}
