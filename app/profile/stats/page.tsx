import Stats from "@/components/pages/profile/Stats";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Suspense } from "react";

import { getUsername } from "@/helpers/auth";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const username = await getUsername();

  return {
    title: `${username ? `${username}'s` : "My"} sighting stats - Birdiary`,
  };
}

/** View of user's basic profile information */
export default async function StatsView() {
  const username = await getUsername();
  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText={`${username ? `${username}'s` : "My"} Sighting Statistics`}
        />
        <Suspense fallback={<Pending variant="profile" />}>
          <Stats />
        </Suspense>
      </ViewWrapper>
    </>
  );
}
