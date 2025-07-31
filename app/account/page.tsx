import { Suspense } from "react";
import Account from "@/components/pages/account/Account";
import Pending from "@/components/pages/shared/Pending";

export default async function AccountView() {
  return (
    <>
      <header className="flex flex-col gap-4">
        <h1>Account</h1>
        <p>View and edit your account information.</p>
      </header>
      <Suspense fallback={<Pending variant="account" />}>
        <Account />
      </Suspense>
    </>
  );
}
