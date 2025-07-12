import { apiRoutes, type ExpectedServerError } from "@/models/api";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
import { getCookie } from "@/helpers/auth";
import { decrypt } from "@/lib/session";
import { UserProfile } from "@/models/display";
export default async function AccountView() {
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
      <header className="flex flex-col gap-4">
        <h1>Account</h1>
        <p>View and edit your account information.</p>
      </header>
      <section>
        <h2>Email &amp; Password</h2>
        <p>Email: {result.email}</p>
        <h3>Update Password</h3>
        <UpdatePasswordForm />
      </section>
    </>
  );
}
