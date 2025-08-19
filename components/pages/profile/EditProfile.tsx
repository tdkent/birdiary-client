import { getCookie } from "@/helpers/auth";
import type { ExpectedServerError } from "@/models/api";
import { apiRoutes } from "@/models/api";
import { decrypt } from "@/lib/session";
import { UserProfile } from "@/models/display";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import EditProfileForm from "@/components/forms/EditProfileForm";

/** Fetch user data and display form. */
export default async function EditProfile() {
  const token = await getCookie();
  const payload = await decrypt(token);

  if (!payload) {
    return (
      <>
        <ErrorDisplay msg="Invalid session data." />
      </>
    );
  }

  const response = await fetch(apiRoutes.user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result: UserProfile | ExpectedServerError = await response.json();

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
      <section className="my-8">
        <EditProfileForm user={result} />
      </section>
    </>
  );
}
