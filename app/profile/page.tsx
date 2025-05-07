import UserProfile from "@/components/pages/profile/UserProfile";
export default function ProfileView() {
  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Profile</h1>
        <p>View and edit your personal information and privacy settings.</p>
      </header>
      <UserProfile />
    </>
  );
}
