import { verifyUser } from "@/actions/auth";
import ExpiredLink from "@/components/pages/auth/ExpiredLink";
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
        return <ExpiredLink email={email} verificationId={verificationId} />;
      }
      //! Provide more info without allowing email resend
      case 404: {
        return <ErrorDisplay statusCode={404} />;
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
