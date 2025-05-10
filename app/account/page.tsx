import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";
export default function AccountView() {
  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Account</h1>
        <p>View and edit your account information.</p>
      </header>
      <section>
        <h2>Update Password</h2>
        <UpdatePasswordForm />
      </section>
    </>
  );
}
