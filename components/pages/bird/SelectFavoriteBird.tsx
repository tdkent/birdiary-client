import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function SelectFavoriteBird() {
  return (
    <>
      <div className="flex items-center rounded-md">
        <Button className="text-base font-normal" variant="outline" size="lg">
          <Heart size={18} strokeWidth={1.5} />
          Set favorite bird
        </Button>
      </div>
    </>
  );
}
