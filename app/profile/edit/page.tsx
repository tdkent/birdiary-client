import EditProfileForm from "@/components/forms/EditProfileForm";
import { BASE_URL } from "@/constants/env";
import { getCookie } from "@/helpers/auth";
import type { User } from "@/models/db";
import type { ExpectedServerError } from "@/models/api";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

export default async function EditProfileView() {
  const token = await getCookie();

  const response = await fetch(BASE_URL + "/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const profileData: User | ExpectedServerError = await response.json();

  // Conditionally render expected server error
  if ("error" in profileData) {
    const msg = Array.isArray(profileData.message)
      ? profileData.message.join(",")
      : profileData.message;

    return (
      <>
        <ErrorDisplay msg={`${profileData.error}: ${msg}`} />
      </>
    );
  }
  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Edit Profile</h1>
        <p>
          Update your profile data including nickname, location, and privacy
          settings.
        </p>
      </header>
      <section className="my-8">
        <EditProfileForm profile={profileData} />
      </section>
    </>
  );
}
