import Icons from "@/components/pages/shared/Icons";
import SightingBadge from "@/components/pages/shared/SightingBadge";
import Link from "next/link";
import type { ReactNode } from "react";

type ListItemProps = {
  count?: number;
  href: string;
  isNew?: boolean;
  mainText: string;
  subText: string | ReactNode;
  sightings?: string[];
};

export default function ListItemNEW({
  count,
  href,
  isNew,
  mainText,
  sightings,
  subText,
}: ListItemProps) {
  return (
    <>
      <li className="list-hover hover:scale-[1.025]">
        <Link href={href}>
          <div className="flex h-[72px] items-center justify-between md:h-20">
            <div className="flex flex-col pl-4 max-md:gap-1.5 md:grow md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
                <span className="line-clamp-1 text-base font-semibold md:grow md:text-xl">
                  {mainText}
                </span>
                <SightingBadge isNew={isNew} />
              </div>
              <span className="line-clamp-1 flex items-center gap-0.5 pr-0.5 text-sm italic md:shrink-0 md:text-base">
                {subText}
              </span>
            </div>
            <Icons count={count} sightings={sightings} />
          </div>
        </Link>
      </li>
    </>
  );
}
