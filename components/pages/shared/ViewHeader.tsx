/** Generic header and heading element for views. */
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type ViewHeaderProps =
  | {
      backLinkHref?: never;
      backLinkText?: never;
      descriptionText?: string;
      headingText: string;
      useSeparator?: boolean;
    }
  | {
      backLinkHref: "birds" | "diary" | "locations" | "sightings";
      backLinkText: string;
      descriptionText?: string;
      headingText: string;
      useSeparator?: boolean;
    };

export default function ViewHeader({
  backLinkHref,
  backLinkText,
  descriptionText,
  headingText,
  useSeparator,
}: ViewHeaderProps) {
  return (
    <>
      <header className="flex flex-col gap-6">
        <h1>{headingText}</h1>
        {descriptionText && <p className="text-xl">{descriptionText}</p>}
        {backLinkHref && (
          <Link href={`/${backLinkHref}`} className="link-inline text-base">
            {backLinkText}
          </Link>
        )}
      </header>
      {useSeparator && <Separator className="mx-auto w-4/5 md:w-3/5" />}
    </>
  );
}
