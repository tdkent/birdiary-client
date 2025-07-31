import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { getCookie } from "@/helpers/auth";
import { decrypt } from "@/lib/session";
import { apiRoutes, type ExpectedServerError } from "@/models/api";
import type { UserProfile } from "@/models/display";

/** Fetch user data and display password update form. */
export default async function Account() {
  const token = await getCookie();
  const payload = await decrypt(token);

  if (!payload || !payload.id) {
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
      <section>
        <h2>Email &amp; Password</h2>
        <p>Email: {result.email}</p>
        <h3>Update Password</h3>
        <UpdatePasswordForm id={result.id} />
      </section>
    </>
  );
}
