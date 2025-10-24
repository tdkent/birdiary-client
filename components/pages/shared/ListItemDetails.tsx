import Icons from "@/components/pages/shared/Icons";
import SightingBadge from "@/components/pages/shared/SightingBadge";
import type { ListVariant } from "@/models/display";
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
      id?: never;
      sightings: string[];
      subText: string | ReactNode;
      variant: ListVariant;
    }
  | {
      commonName?: never;
      count?: never;
      href: string;
      iconVariant: "none";
      imgSecureUrl?: never;
      isNew?: boolean;
      mainText: string;
      id?: never;
      sightings?: never;
      subText: string | ReactNode;
      variant: ListVariant;
    }
  | {
      commonName: string;
      count?: number;
      href: string;
      iconVariant?: "single";
      imgSecureUrl: string | null;
      isNew?: boolean;
      mainText: string;
      id: number;
      sightings?: never;
      subText: string | ReactNode;
      variant: ListVariant;
    };

export default function ListItemDetails({
  commonName,
  count,
  href,
  iconVariant,
  imgSecureUrl,
  isNew,
  mainText,
  id,
  sightings,
  subText,
  variant,
}: ListItemProps) {
  const leftAlignSubtext = ["diaryDetail", "birds", "lifeList"];
  return (
    <>
      <li className="list-hover hover:scale-[1.025]">
        <Link href={href}>
          <div
            className={`flex h-[72px] items-center justify-between ${leftAlignSubtext.includes(variant) && "gap-4"} px-4 md:h-20`}
          >
            <div
              className={`flex flex-col max-md:gap-1.5 md:grow ${variant !== "locations" && "md:flex-row md:items-center"} ${leftAlignSubtext.includes(variant) ? "md:gap-8" : "md:justify-between"}`}
            >
              <div
                className={`flex items-center gap-2 ${leftAlignSubtext.includes(variant) && "md:w-1/2"} md:gap-6 lg:gap-8`}
              >
                <span
                  className={`line-clamp-1 break-all ${variant === "locations" ? "text-base md:text-lg" : "text-base md:text-xl"} font-semibold`}
                >
                  {mainText}
                </span>
                <SightingBadge count={count} isNew={isNew} variant={variant} />
              </div>
              <span
                className={`line-clamp-1 break-all pr-0.5 text-sm italic ${leftAlignSubtext.includes(variant) && "md:w-1/2"} md:shrink-0 md:text-base`}
              >
                {subText}
              </span>
            </div>
            {iconVariant === "multi" && (
              <Icons
                count={count}
                listVariant={variant}
                sightings={sightings}
                variant={iconVariant}
              />
            )}
            {iconVariant === "single" && (
              <Icons
                commonName={commonName}
                imgSecureUrl={imgSecureUrl}
                listVariant={variant}
                sightingId={id}
                variant={iconVariant}
              />
            )}
          </div>
        </Link>
      </li>
    </>
  );
}
