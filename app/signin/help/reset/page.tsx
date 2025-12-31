import { serverApiRequest } from "@/actions/api.actions";
import ResetPasswordSubmitPassword from "@/components/forms/ResetPasswordSubmitPassword";
import InvalidVerificationLink from "@/components/pages/auth/InvalidVerificationLink";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Button } from "@/components/ui/button";
import { Jwt } from "@/schemas/auth.schema";
import type { ApiResponse } from "@/types/api.types";
import { ErrorMessages } from "@/types/error-messages.enum";
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

  const isValidJwt = Jwt.safeParse(token);

  if (!isValidJwt.success)
    return <ErrorDisplay msg={ErrorMessages.BadRequest} />;

  const result: ApiResponse<null> = await serverApiRequest({
    route: `/users/forgot-password?token=${token}`,
  });

  if (result.error) {
    if (result.statusCode === 400) return <InvalidVerificationLink />;
    return <ErrorDisplay msg={result.message} />;
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
