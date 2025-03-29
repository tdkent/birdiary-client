import type { Sighting } from "@/types/models";

type SightingListItemProps = {
  sighting: Sighting;
};

export default function SightingListItem({ sighting }: SightingListItemProps) {
  return (
    <>
      <li className="px-2 py-3 flex justify-between items-center">
        <span className="text-sm">{sighting.commName}</span>
        <span className="text-sm">{sighting.date}</span>
      </li>
    </>
  );
}
