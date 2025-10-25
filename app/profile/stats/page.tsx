import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Suspense } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View my sighting stats | Birdiary",
};

/** View of user's basic profile information */
export default function StatsView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Sighting Stats"
          descriptionText="View a range of sighting statistics."
        />
        <Suspense fallback={<Pending variant="profile" />}>
          <p>hello world</p>
        </Suspense>
      </ViewWrapper>
    </>
  );
}
