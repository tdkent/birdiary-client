import Profile from "@/components/pages/profile/Profile";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Suspense } from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View my profile | Birdiary",
};

/** View of user's basic profile information */
export default function ProfileView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="My Profile" />
        <Suspense fallback={<Pending variant="profile" />}>
          <Profile />
        </Suspense>
      </ViewWrapper>
    </>
  );
}
