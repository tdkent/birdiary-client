import type { Sighting } from "@/types/models";
import { createRelativeDate } from "@/helpers/dates";

type SightingListItemProps = {
  sighting: Sighting;
};

export default function SightingListItem({ sighting }: SightingListItemProps) {
  const date = createRelativeDate(sighting.date);
  return (
    <>
      <li className="px-2 py-4 flex justify-between items-center">
        <span className="text-sm">{sighting.commName}</span>
        <span className="text-sm">{date}</span>
      </li>
    </>
  );
}
