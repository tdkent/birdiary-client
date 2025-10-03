import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Birdiary",
};

/** 404 page not found view */
export default function NotFound() {
  return (
    <>
      <ViewWrapper>
        <div className="flex flex-col gap-12 max-lg:items-center">
          <span className="text-6xl tracking-widest lg:text-8xl">404</span>
          <span className="text-3xl tracking-widest lg:text-4xl">
            Page not found
          </span>
          <Button asChild size="lg" variant="secondary">
            <Link href="/">Go to homepage</Link>
          </Button>
        </div>
      </ViewWrapper>
    </>
  );
}
