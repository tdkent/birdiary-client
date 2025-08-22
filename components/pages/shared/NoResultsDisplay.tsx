import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type NoResultsDisplayType = {
  text: string;
};

export default function NoResultsDisplay({ text }: NoResultsDisplayType) {
  return (
    <>
      <div className="my-10 flex flex-col gap-8">
        <p className="italic">{text}</p>
        <Button asChild size="lg" variant="new">
          <Link href="/newsighting">
            <Plus />
            Add a new sighting
          </Link>
        </Button>
      </div>
    </>
  );
}
