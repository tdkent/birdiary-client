import Icons from "@/components/pages/shared/Icons";
import SightingBadge from "@/components/pages/shared/SightingBadge";
import Link from "next/link";
import type { ReactNode } from "react";

type ListItemProps =
  | {
      commonName?: never;
      count: number;
      href: string;
      iconVariant?: "multi";
      imgSecureUrl?: never;
      isNew?: boolean;
      mainText: string;
      sightingId?: never;
      sightings: string[];
      subText: string | ReactNode;
    }
  | {
      commonName?: never;
      count?: never;
      href: string;
      iconVariant: "none";
      imgSecureUrl?: never;
      isNew?: boolean;
      mainText: string;
      sightingId?: never;
      sightings?: never;
      subText: string | ReactNode;
    }
  | {
      commonName: string;
      count?: never;
      href: string;
      iconVariant?: "single";
      imgSecureUrl: string | null;
      isNew?: boolean;
      mainText: string;
      sightingId: number;
      sightings?: never;
      subText: string | ReactNode;
    };

export default function ListItemNEW({
  commonName,
  count,
  href,
  iconVariant,
  imgSecureUrl,
  isNew,
  mainText,
  sightingId,
  sightings,
  subText,
}: ListItemProps) {
  return (
    <>
      <li className="list-hover hover:scale-[1.025]">
        <Link href={href}>
          <div className="flex h-[72px] items-center justify-between px-4 md:h-20">
            <div className="flex flex-col max-md:gap-1.5 md:grow md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 md:gap-6 lg:gap-8">
                <span className="line-clamp-1 break-all text-base font-semibold md:text-xl">
                  {mainText}
                </span>
                <SightingBadge isNew={isNew} />
              </div>
              <span className="line-clamp-1 break-all pr-0.5 text-sm italic md:shrink-0 md:text-base">
                {subText}
              </span>
            </div>
            {iconVariant === "multi" && (
              <Icons
                count={count}
                sightings={sightings}
                variant={iconVariant}
              />
            )}
            {iconVariant === "single" && (
              <Icons
                commonName={commonName}
                imgSecureUrl={imgSecureUrl}
                sightingId={sightingId}
                variant={iconVariant}
              />
            )}
          </div>
        </Link>
      </li>
    </>
  );
}
