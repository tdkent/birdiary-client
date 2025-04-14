import type { SingleBirdWithCount } from "@/types/models";

type BirdpediaListItemProps = {
  bird: SingleBirdWithCount;
};
export default function BirdpediaListItem({ bird }: BirdpediaListItemProps) {
  return (
    <>
      <li className="my-4">
        <h3 className="text-base">{bird.commName}</h3>
        <div className="flex gap-4 text-xs">
          <span>
            <i>{bird.sciName}</i>
          </span>
          <span>
            {bird.count && bird.count >= 1 ? `${bird.count} sightings` : null}
          </span>
        </div>
      </li>
    </>
  );
}
