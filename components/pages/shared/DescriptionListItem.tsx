import Link from "next/link";
import { ReactNode } from "react";

type DescriptionListItemProps = {
  dt: string;
  dd: number | ReactNode | string;
  fallbackText?: string;
  linkHref?: string;
  linkText?: string;
  useItalics?: boolean;
  useList?: boolean;
};

export default function DescriptionListItem({
  dt,
  dd,
  fallbackText = "N/A",
  linkHref,
  linkText,
  useItalics,
  useList,
}: DescriptionListItemProps) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <dt className="text-sm font-semibold uppercase md:text-base">{dt}</dt>
        <dd
          className={`whitespace-pre-wrap break-words ${dd ? "text-xl md:text-2xl" : "text-lg md:text-xl"} ${(useItalics || !dd) && "italic"}`}
        >
          {useList ? (
            dd ? (
              <>
                <ol className="flex flex-col gap-1 text-base sm:text-xl md:text-2xl">
                  {dd}
                </ol>
              </>
            ) : (
              "N/A"
            )
          ) : (
            dd || fallbackText
          )}
        </dd>
        {linkHref && (
          <>
            <Link href={linkHref} className="link-inline text-lg md:text-xl">
              {linkText}
            </Link>
          </>
        )}
      </div>
    </>
  );
}
