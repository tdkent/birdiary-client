// Returns a simple list item with sighting data

import type { FetchedSighting } from "@/types/models";
import { createRelativeDate } from "@/helpers/dates";

type SightingListItemProps = {
  sighting: FetchedSighting;
};

export default function SightingListItem({ sighting }: SightingListItemProps) {
  const date = createRelativeDate(sighting.date);
  return (
    <>
      <li className="flex items-center justify-between px-2 py-4">
        <span className="text-sm">{sighting.commName}</span>
        <span className="text-sm">{date}</span>
      </li>
    </>
  );
}
