import { Suspense } from "react";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import Profile from "@/components/pages/profile/Profile";
import Pending from "@/components/pages/shared/Pending";

/** View of user's basic profile information */
export default function ProfileView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Profile"
          descriptionText="View profile information and account settings."
        />
        <Suspense fallback={<Pending variant="profile" />}>
          <Profile />
        </Suspense>
      </ViewWrapper>
    </>
  );
}
