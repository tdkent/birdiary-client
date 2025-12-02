import Profile from "@/components/pages/profile/Profile";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Suspense } from "react";

import { getUsername } from "@/helpers/auth";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const username = await getUsername();

  return {
    title: `${username ? `${username}'s` : "My"} profile - Birdiary`,
    description: "View and edit your personal profile and account details.",
  };
}

/** View of user's basic profile information */
export default async function ProfileView() {
  const username = await getUsername();
  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText={`${username ? `${username}'s` : "My"} Profile`}
        />
        <Suspense fallback={<Pending variant="profile" />}>
          <Profile />
        </Suspense>
      </ViewWrapper>
    </>
  );
}
