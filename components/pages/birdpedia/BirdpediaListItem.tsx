import Link from "next/link";
import type { SingleBirdWithCount } from "@/types/models";

type BirdpediaListItemProps = {
  item: SingleBirdWithCount;
};

export default function BirdpediaListItem({ item }: BirdpediaListItemProps) {
  const { commName, sciName, count } = item;
  const sightingCount = count && count > 0 ? count : null;
  return (
    <>
      <li className="my-4">
        <Link href={`/birds/${commName.replace(" ", "_")}`}>
          <h3 className="text-base">{commName}</h3>
          <div className="flex gap-4 text-xs">
            <span>
              <i>{sciName}</i>
            </span>
            {sightingCount && (
              <span>
                {sightingCount > 1
                  ? `${sightingCount} sightings`
                  : "1 sighting"}
              </span>
            )}
          </div>
        </Link>
      </li>
    </>
  );
}
