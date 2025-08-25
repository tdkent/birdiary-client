import Link from "next/link";
import { Button } from "@/components/ui/button";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import UpdatePasswordForm from "@/components/forms/UpdatePasswordForm";

export default async function UpdatePasswordView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Update Password"
          descriptionText="Change the password used to sign in to your account."
          useSeparator
        />
        <div className="flex flex-col gap-4">
          <UpdatePasswordForm />
          <Button asChild size="lg" variant="secondary">
            <Link href="/profile">Cancel</Link>
          </Button>
        </div>
      </ViewWrapper>
    </>
  );
}
