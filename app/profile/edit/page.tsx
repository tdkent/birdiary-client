import EditProfile from "@/components/pages/profile/EditProfile";
import Pending from "@/components/pages/shared/Pending";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Suspense } from "react";

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
