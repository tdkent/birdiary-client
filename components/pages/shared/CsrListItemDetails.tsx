import Link from "next/link";

type CsrListItemDetailsProps = {
  href: string;
  text: string;
  subtext?: string;
  count?: number;
};

export default function CsrListItemDetails({
  href,
  text,
  subtext,
  count,
}: CsrListItemDetailsProps) {
  const sightingCount = count && count > 0 ? count : null;
  const countText = sightingCount
    ? `${sightingCount} sighting${sightingCount > 1 ? "s" : ""}`
    : "";
  return (
    <>
      <li className="list-hover hover:scale-[1.025]">
        <Link href={href} className="">
          <div className="flex flex-col px-4 py-4 md:w-full md:flex-row md:justify-between md:gap-16 md:py-6 md:text-xl">
            <span className="line-clamp-1 text-lg font-semibold md:grow md:text-xl">
              {text}
            </span>
            <span className="line-clamp-1 text-lg italic md:shrink-0">
              {subtext ?? countText}
            </span>
          </div>
        </Link>
      </li>
    </>
  );
}
