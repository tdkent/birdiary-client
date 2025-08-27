import Link from "next/link";
import { Button } from "@/components/ui/button";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";

/** 404 page not found view */
export default function NotFound() {
  return (
    <>
      <ViewWrapper>
        <div className="flex flex-col items-center gap-12">
          <span className="text-6xl tracking-widest">404</span>
          <span className="text-3xl tracking-widest">Page not found</span>
          <Button asChild size="lg" variant="secondary">
            <Link href="/">Go to homepage</Link>
          </Button>
        </div>
      </ViewWrapper>
    </>
  );
}
