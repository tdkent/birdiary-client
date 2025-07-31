import { LoaderCircle } from "lucide-react";

export default function PendingIcon({
  strokeWidth,
  size,
}: {
  strokeWidth: number;
  size: number;
}) {
  return (
    <LoaderCircle
      strokeWidth={strokeWidth}
      size={size}
      className="animate-spin"
    />
  );
}
