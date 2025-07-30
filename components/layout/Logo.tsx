import Link from "next/link";
import Image from "next/image";
import { caveat } from "@/lib/fonts";

/** Birdiary logo and header text with link to Home */
export default function Logo() {
  return (
    <>
      <Link href="/" className="flex items-center gap-2 md:gap-4">
        <div className="relative h-12 w-12 rounded-full border-2 border-blue-300 sm:h-16 sm:w-16">
          <Image
            src="/icon/blue-jay-icon.webp"
            alt="Blue Jay"
            fill
            sizes="(max-width: 768px) 48px, 64px"
            className="rounded-full object-cover"
          />
        </div>
        <span
          className={`${caveat.className} text-4xl antialiased max-[480px]:hidden sm:text-5xl`}
        >
          Birdiary
        </span>
      </Link>
    </>
  );
}
