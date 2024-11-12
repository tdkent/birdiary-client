import Image from "next/image";
import { caveat } from "@/lib/fonts";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      <div className="rounded-full relative border-2 border-blue-300 w-12 h-12 md:h-16 md:w-16">
        <Image
          src="/icon/blue-jay-icon.webp"
          alt="Blue Jay"
          fill
          sizes="(max-width: 768px) 48px, 64px"
          className="object-cover rounded-full"
        />
      </div>
      <span
        className={`${caveat.className} antialiased text-4xl md:text-5xl max-[480px]:hidden`}
      >
        Birdiary
      </span>
    </div>
  );
}
