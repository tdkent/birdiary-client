import Icons from "@/components/pages/shared/Icons";
import Link from "next/link";
import type { ReactNode } from "react";

type ListItemProps = {
  count?: number;
  href: string;
  mainText: string;
  subText: string | ReactNode;
  sightings?: string[];
};

export default function ListItemNEW({
  count,
  href,
  mainText,
  sightings,
  subText,
}: ListItemProps) {
  const showIcons = sightings && count;
  return (
    <>
      <li className="list-hover hover:scale-[1.025]">
        <Link href={href}>
          <div className="flex h-[72px] items-center justify-between md:h-20">
            <div className="flex flex-col px-4 md:w-2/5 md:flex-row md:items-center">
              <span className="line-clamp-1 text-base font-semibold md:grow md:text-xl">
                {mainText}
              </span>
              <span className="line-clamp-1 flex items-center gap-0.5 pr-0.5 text-xs italic md:shrink-0 md:text-base">
                {subText}
              </span>
            </div>
            {showIcons && <Icons count={count} sightings={sightings} />}
          </div>
        </Link>
      </li>
    </>
  );
}
