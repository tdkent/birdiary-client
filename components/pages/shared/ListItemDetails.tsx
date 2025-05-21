import Link from "next/link";

type ListItemDetailsProps = {
  href: string;
  text: string;
  subtext: string;
  count?: number;
};

export default function ListItemDetails({
  href,
  text,
  subtext,
  count,
}: ListItemDetailsProps) {
  const sightingCount = count && count > 0 ? count : null;
  return (
    <>
      <li className="my-4">
        <Link href={href}>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-medium">{text}</span>
              <span className="text-sm italic">{subtext}</span>
            </div>
            {sightingCount && (
              <div>
                <span className="text-sm">
                  {sightingCount > 1
                    ? `${sightingCount} sightings`
                    : "1 sighting"}
                </span>
              </div>
            )}
          </div>
        </Link>
      </li>
    </>
  );
}
