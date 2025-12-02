import { verifyResetPassword } from "@/actions/auth";
import ResetPasswordSubmitPassword from "@/components/forms/ResetPasswordSubmitPassword";
import InvalidVerificationLink from "@/components/pages/auth/InvalidVerificationLink";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Button } from "@/components/ui/button";
import { validJwtFormat } from "@/models/form";
import type { Metadata } from "next";
import Link from "next/link";

type ResetPasswordViewProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export const metadata: Metadata = {
  title: "Reset your password - Birdiary",
};

export default async function ResetPasswordView({
  searchParams,
}: ResetPasswordViewProps) {
  const { token } = await searchParams;

  const isValidJwt = validJwtFormat.safeParse(token);

  if (!isValidJwt.success) return <ErrorDisplay statusCode={400} />;

  const result = await verifyResetPassword(token);

  if ("error" in result) {
    if (result.statusCode === 400) return <InvalidVerificationLink />;
    return <ErrorDisplay />;
  }

  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="Reset Your Password" />
        <div className="flex flex-col gap-8">
          <ResetPasswordSubmitPassword token={token} />
          <Button asChild variant="secondary" size="lg">
            <Link href="/signin">Cancel</Link>
          </Button>
        </div>
      </ViewWrapper>
    </>
  );
}
