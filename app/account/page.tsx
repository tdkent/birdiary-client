import { getUser } from "@/actions/profile";
import type { UserProfile } from "@/types/models";
import type { ExpectedServerError } from "@/types/api";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
export default async function AccountView() {
  const user: UserProfile | ExpectedServerError = await getUser();

  if ("error" in user) {
    const msg = Array.isArray(user.message)
      ? user.message.join(",")
      : user.message;

    return (
      <>
        <ErrorDisplay msg={`${user.error}: ${msg}`} />
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
        <p>Email: {user.email}</p>
        <h3>Update Password</h3>
        <UpdatePasswordForm />
      </section>
    </>
  );
}
