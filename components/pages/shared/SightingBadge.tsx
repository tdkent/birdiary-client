import { Badge } from "@/components/ui/badge";

type SightingBadgeProps = {
  isNew?: boolean;
};

export default function SightingBadge({ isNew }: SightingBadgeProps) {
  if (!isNew) return null;
  return (
    <>
      <Badge variant="lifeList">
        <span>
          1<sup className="relative top-[-2.5px]">st</sup>
        </span>
      </Badge>
    </>
  );
}
