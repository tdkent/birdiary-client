import EditProfileForm from "@/components/forms/EditProfileForm";
import { getCookie } from "@/helpers/auth";
import type { User } from "@/models/db";
import type { ExpectedServerError } from "@/models/api";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { apiRoutes } from "@/models/api";
import { decrypt } from "@/lib/session";

export default async function EditProfileView() {
  const token = await getCookie();
  const payload = await decrypt(token);

  if (!payload) {
    return (
      <>
        <ErrorDisplay msg="Invalid session data." />
      </>
    );
  }

  const response = await fetch(apiRoutes.user(payload.id as number), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result: User | ExpectedServerError = await response.json();

  if ("error" in result) {
    const msg = Array.isArray(result.message)
      ? result.message.join(",")
      : result.message;

    return (
      <>
        <ErrorDisplay msg={`${result.error}: ${msg}`} />
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
        <EditProfileForm profile={result} />
      </section>
    </>
  );
}
