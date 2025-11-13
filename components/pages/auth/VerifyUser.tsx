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
      case 404: {
        return (
          <>
            <div className="flex flex-col gap-4 px-4 py-8 md:gap-6">
              <h1 className="font-heading text-3xl">Expired link</h1>
              <p className="text-lg">
                The verification link you followed is invalid or expired.
              </p>
              {/* Add support email */}
            </div>
          </>
        );
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
