import Link from "next/link";
import { Button } from "@/components/ui/button";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";

export default function NotFound() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="404" descriptionText="Page not found" />
        <Button asChild size="lg" variant="secondary">
          <Link href="/">Return Home</Link>
        </Button>
      </ViewWrapper>
    </>
  );
}
