import Stats from "@/components/pages/profile/Stats";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Suspense } from "react";

import { getUserProfileOrNull } from "@/helpers/auth.helpers";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getUserProfileOrNull();

  return {
    title: `${user && user.name ? `${user.name}'s` : "My"} sighting stats - Birdiary`,
    description:
      "View your personal birdwatching statistics including sighting counts and favorites.",
  };
}

/** View of user's basic profile information */
export default async function StatsView() {
  const user = await getUserProfileOrNull();
  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText={`${user && user.name ? `${user.name}'s` : "My"} Sighting Statistics`}
        />
        <Suspense fallback={<Pending variant="profile" />}>
          <Stats />
        </Suspense>
      </ViewWrapper>
    </>
  );
}
