import { Suspense } from "react";
import EditProfile from "@/components/pages/profile/EditProfile";
import Pending from "@/components/pages/shared/Pending";

export default async function EditProfileView() {
  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Edit Profile</h1>
        <p>
          Update your profile data including nickname, location, and privacy
          settings.
        </p>
      </header>
      <Suspense fallback={<Pending variant="profileForm" />}>
        <EditProfile />
      </Suspense>
    </>
  );
}
