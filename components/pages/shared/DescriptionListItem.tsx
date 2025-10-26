import Link from "next/link";
import { ReactNode } from "react";

type DescriptionListItemProps = {
  dt: string;
  dd: number | ReactNode | string;
  linkHref?: string;
  useList?: boolean;
};

export default function DescriptionListItem({
  dt,
  dd,
  linkHref,
  useList,
}: DescriptionListItemProps) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <dt className="text-sm font-semibold uppercase md:text-base">{dt}</dt>
        <dd className="text-xl md:text-2xl">
          {useList ? (
            <>
              <ol className="flex flex-col gap-1 text-base sm:text-xl md:text-2xl">
                {dd}
              </ol>
            </>
          ) : (
            dd
          )}
        </dd>
        {linkHref && (
          <>
            <Link href={linkHref} className="link-inline text-lg md:text-xl">
              View bird
            </Link>
          </>
        )}
      </div>
    </>
  );
}
