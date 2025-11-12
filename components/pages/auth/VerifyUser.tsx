import { verifyUser } from "@/actions/auth";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type VerifyUserProps = {
  verificationId: string;
};

export default async function VerifyUser({ verificationId }: VerifyUserProps) {
  const error = await verifyUser(verificationId);

  if (error) {
    if (error.statusCode === 403) {
      // Resend email
      return;
    }
    return <ErrorDisplay statusCode={error.statusCode} />;
  }

  return <>{verificationId}</>;
}
