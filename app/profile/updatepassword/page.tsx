import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";

export default async function UpdatePasswordView() {
  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Update Password</h1>
        <p>
          Change the password used to sign in to your account. Your password
          must be 8-36 characters.
        </p>
      </header>
      <UpdatePasswordForm />
    </>
  );
}
