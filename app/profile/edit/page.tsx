import { Suspense } from "react";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import EditProfile from "@/components/pages/profile/EditProfile";
import Pending from "@/components/pages/shared/Pending";

export default async function EditProfileView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Edit Profile"
          descriptionText="Update your profile data including nickname, location, and privacy
            settings."
          useSeparator
        />
        <Suspense fallback={<Pending variant="profileForm" />}>
          <EditProfile />
        </Suspense>
      </ViewWrapper>
    </>
  );
}
