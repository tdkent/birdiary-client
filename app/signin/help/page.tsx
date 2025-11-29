import ResetPasswordSubmitEmail from "@/components/forms/ResetPasswordSubmitEmail";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInHelpView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Reset Password"
          descriptionText="Enter the email address associated with your Birdiary account."
        />
        <div className="flex flex-col gap-8">
          <ResetPasswordSubmitEmail />
          <Button asChild variant="secondary" size="lg">
            <Link href="/signin">Cancel</Link>
          </Button>
        </div>
      </ViewWrapper>
    </>
  );
}
