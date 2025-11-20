import { verifyUser } from "@/actions/auth";
import InvalidVerificationLink from "@/components/pages/auth/InvalidVerificationLink";
import VerifySuccess from "@/components/pages/auth/VerifySuccess";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type VerifyUserProps = {
  email: string;
  verificationId: string;
};

export default async function VerifyUser({
  email,
  verificationId,
}: VerifyUserProps) {
  const result = await verifyUser(email, verificationId);

  if ("error" in result) {
    if (result.statusCode === 400) return <InvalidVerificationLink />;
    return <ErrorDisplay />;
  }

  return <VerifySuccess email={email} />;
}
