/** Generic header and heading element for views. */
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type ViewHeaderProps =
  | {
      backLinkHref?: never;
      backLinkText?: never;
      headingText: string;
      icon?: LucideIcon;
    }
  | {
      backLinkHref: "birds" | "diary" | "lifelist" | "locations" | "sightings";
      backLinkText: string;
      headingText: string;
      icon?: never;
    };

export default function ViewHeader({
  backLinkHref,
  backLinkText,
  headingText,
  icon: Icon,
}: ViewHeaderProps) {
  return (
    <>
      <header className="flex flex-col gap-6">
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
          <h1>{headingText}</h1>
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
