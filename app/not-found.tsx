import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
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
        <ViewHeader headingText="404 - Page Not Found" />
        <div className="flex flex-col gap-8">
          <p>Sorry, that page doesn&apos;t exist.</p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/">
              <House size={18} strokeWidth={1.5} />
              Home
            </Link>
          </Button>
        </div>
      </ViewWrapper>
    </>
  );
}
