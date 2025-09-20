import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function NewSightingButton() {
  return (
    <>
      <Button asChild size="lg" variant="new">
        <Link href="/newsighting">
          <Plus />
          Add a new sighting
        </Link>
      </Button>
    </>
  );
}
