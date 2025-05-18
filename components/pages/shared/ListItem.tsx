import Link from "next/link";
import type {
  SingleBirdWithCount,
  Sighting,
  ListPathname,
  GroupData,
} from "@/types/models";
import { createLocaleString } from "@/helpers/dates";

type ListItemProps = {
  pathname: ListPathname;
  item: SingleBirdWithCount | Sighting | GroupData;
};

/** SSR component that renders a single item in List */
export default function ListItem({ pathname, item }: ListItemProps) {
  if (pathname === "birds") {
    const bird = item as SingleBirdWithCount;
    return (
      <>
        <li className="my-4">
          <Link href={`/birds/${bird.commName.replace(" ", "_")}`}>
            <h3 className="text-base">{bird.commName}</h3>
            <div className="flex gap-4 text-xs">
              <span>
                <i>{bird.sciName}</i>
              </span>
              <span>
                {bird.count && bird.count >= 1
                  ? `${bird.count} sightings`
                  : null}
              </span>
            </div>
          </Link>
        </li>
      </>
    );
  }

  if (pathname === "locations") {
    const { id, name, count } = item as GroupData;
    return (
      <>
        <li className="my-4">
          <Link href={`/locations/${id}_${name}`}>
            <div className="flex flex-col">
              <span className="font-semibold">{name}</span>
              <span className="text-sm">
                {count} sighting{count > 1 && "s"}
              </span>
            </div>
          </Link>
        </li>
      </>
    );
  }

  const sighting = item as Sighting;
  return (
    <>
      <li className="my-4">
        <Link href={`/birds/${sighting.commName.replace(" ", "_")}`}>
          <h3 className="text-base">{sighting.commName}</h3>
          <div className="flex gap-4 text-xs">
            <span>
              <i>
                First observation: {createLocaleString(sighting.date, "med")}
              </i>
            </span>
          </div>
        </Link>
      </li>
    </>
  );
}
