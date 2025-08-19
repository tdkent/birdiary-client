import { Suspense } from "react";
import Profile from "@/components/pages/profile/Profile";
import Pending from "@/components/pages/shared/Pending";

/** View of user's basic profile information */
export default function ProfileView() {
  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Profile</h1>
        <p>View profile information and account settings.</p>
      </header>
      <Suspense fallback={<Pending variant="profile" />}>
        <Profile />
      </Suspense>
    </>
  );
}
