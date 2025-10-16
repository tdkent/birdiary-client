import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";

type SightingBadgeProps = {
  isNew?: boolean;
};

export default function SightingBadge({ isNew }: SightingBadgeProps) {
  if (!isNew) return null;
  return (
    <>
      <Badge variant="lifeList">
        <BadgeCheckIcon size={12} />
        Lifelist
      </Badge>
    </>
  );
}
