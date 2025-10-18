import { Badge } from "@/components/ui/badge";

type SightingBadgeProps = {
  count?: number;
  isNew?: boolean;
};

export default function SightingBadge({ count, isNew }: SightingBadgeProps) {
  if (count)
    return (
      <>
        <Badge variant="secondary">
          <span>{count}</span>
        </Badge>
      </>
    );
  if (isNew)
    return (
      <>
        <Badge variant="lifeList">
          <span>
            1<sup className="relative top-[-2.5px]">st</sup>
          </span>
        </Badge>
      </>
    );
  return null;
}
