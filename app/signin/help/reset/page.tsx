import { verifyResetPassword } from "@/actions/auth";
import ResetPasswordSubmitPassword from "@/components/forms/ResetPasswordSubmitPassword";
import InvalidVerificationLink from "@/components/pages/auth/InvalidVerificationLink";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";

type ResetPasswordViewProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function ResetPasswordView({
  searchParams,
}: ResetPasswordViewProps) {
  const { token } = await searchParams;
  const result = await verifyResetPassword(token);

  if ("error" in result) {
    if (result.statusCode === 400) return <InvalidVerificationLink />;
    return <ErrorDisplay />;
  }

  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Update Your Password"
          descriptionText="Update the password you use to sign in to your account with."
        />
        <ResetPasswordSubmitPassword token={token} />
      </ViewWrapper>
    </>
  );
}
