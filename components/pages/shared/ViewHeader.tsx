/** Generic header and heading element for views. */
import { Separator } from "@/components/ui/separator";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type ViewHeaderProps =
  | {
      backLinkHref?: never;
      backLinkText?: never;
      descriptionText?: string;
      headingText: string;
      useSeparator?: boolean;
      icon?: LucideIcon;
    }
  | {
      backLinkHref: "birds" | "diary" | "lifelist" | "locations" | "sightings";
      backLinkText: string;
      descriptionText?: string;
      headingText: string;
      useSeparator?: boolean;
      icon?: never;
    };

export default function ViewHeader({
  backLinkHref,
  backLinkText,
  descriptionText,
  headingText,
  icon: Icon,
  useSeparator,
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
        {descriptionText && (
          <p className="text-xl md:text-2xl">{descriptionText}</p>
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
      {useSeparator && <Separator className="mx-auto w-4/5 md:w-3/5" />}
    </>
  );
}
