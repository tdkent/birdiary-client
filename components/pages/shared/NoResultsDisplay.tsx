import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function NoResultsDisplay({ variant }: { variant: string }) {
  switch (variant) {
    case "sighting":
      return <p>You haven&apos;t added any sightings!</p>;

    case "diary":
      return (
        <div className="my-10 flex flex-col gap-2">
          <p className="text-center italic">No diary entries yet!</p>
          <Button asChild>
            <Link href="/newsighting">
              <Plus />
              Add a new sighting
            </Link>
          </Button>
        </div>
      );

    case "birdDetail":
      return <p>You have not observed this bird yet!</p>;

    default:
      return <p>Nothing to show!</p>;
  }
}
