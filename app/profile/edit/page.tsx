import EditProfile from "@/components/pages/profile/EditProfile";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Edit my profile - Birdiary",
};

export default async function EditProfileView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="Edit Profile" />
        <Suspense fallback={<Pending variant="profileForm" />}>
          <EditProfile />
        </Suspense>
      </ViewWrapper>
    </>
  );
}
