/** Generic header and heading element for views. */
import type { LucideIcon } from "lucide-react";
import { Heart } from "lucide-react";
import Link from "next/link";

type ViewHeaderProps =
  | {
      backLinkHref?: never;
      backLinkText?: never;
      headingText: string;
      icon?: LucideIcon;
      isFavBird?: never;
      subtext?: never;
    }
  | {
      backLinkHref: "birds" | "diary" | "lifelist" | "locations" | "sightings";
      backLinkText: string;
      headingText: string;
      icon?: never;
      isFavBird?: boolean | null;
      subtext?: string;
    };

export default function ViewHeader({
  backLinkHref,
  backLinkText,
  headingText,
  icon: Icon,
  isFavBird,
  subtext,
}: ViewHeaderProps) {
  return (
    <>
      <header className="flex flex-col gap-6 break-words">
        {Icon ? (
          <div>
            <Icon
              className="inline -translate-y-2 max-md:-translate-y-1"
              strokeWidth={1.5}
              size={30}
            />
            <h1 className="ml-2.5 inline">{headingText}</h1>
          </div>
        ) : (
          <h1>
            <span className="mr-1">{headingText}</span>
            {isFavBird && (
              <Heart
                className="inline -translate-y-0.5 fill-fuchsia-400 text-fuchsia-300"
                strokeWidth={1.5}
                size={26}
              />
            )}
          </h1>
        )}
        {subtext && (
          <p className="text-sm text-foreground/60 md:text-base">{subtext}</p>
        )}
        {backLinkHref && (
          <Link
            href={`/${backLinkHref}`}
            className="link-inline text-lg md:text-xl"
          >
            {backLinkText}
          </Link>
        )}
      </header>
    </>
  );
}
