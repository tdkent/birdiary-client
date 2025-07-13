import Profile from "@/components/pages/profile/Profile";
export default function ProfileView() {
  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Profile</h1>
        <p>View and edit your personal information and privacy settings.</p>
      </header>
      <Profile />
    </>
  );
}
