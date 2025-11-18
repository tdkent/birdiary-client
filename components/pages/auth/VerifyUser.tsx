import { verifyUser } from "@/actions/auth";
import ExpiredVerificationLink from "@/components/pages/auth/ExpiredVerificationLink";
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
    switch (result.statusCode) {
      case 403: {
        return (
          <ExpiredVerificationLink
            email={email}
            verificationId={verificationId}
          />
        );
      }
      case 404: {
        return <InvalidVerificationLink />;
      }
      default:
        return <ErrorDisplay />;
    }
  }

  return (
    <>
      <VerifySuccess email={email} />
    </>
  );
}
