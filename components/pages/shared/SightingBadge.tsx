import { Badge } from "@/components/ui/badge";
import type { ListVariant } from "@/models/display";

type SightingBadgeProps = {
  count?: number;
  isNew?: boolean;
  variant: ListVariant;
};

export default function SightingBadge({
  count,
  isNew,
  variant,
}: SightingBadgeProps) {
  const exclude: (typeof variant)[] = ["diary", "locations"];
  const doNotShow = exclude.includes(variant) || (!count && !isNew);

  if (doNotShow) return null;

  return (
    <>
      <Badge variant={count ? "secondary" : "lifeList"}>
        <span>{count || <LifeListBadge />}</span>
      </Badge>
    </>
  );
}

function LifeListBadge() {
  return (
    <>
      <span>LL</span>
    </>
  );
}
