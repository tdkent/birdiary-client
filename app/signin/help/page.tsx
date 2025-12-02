import ResetPasswordSubmitEmail from "@/components/forms/ResetPasswordSubmitEmail";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forgot your password? - Birdiary",
};

export default function SignInHelpView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="Forgot Your Password?" />
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
