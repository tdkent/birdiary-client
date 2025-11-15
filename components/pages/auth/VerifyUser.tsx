import { verifyUser } from "@/actions/auth";
import ExpiredLink from "@/components/pages/auth/ExpiredLink";
import VerifySuccess from "@/components/pages/auth/VerifySuccess";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { SUPPORT_EMAIL_ADDRESS } from "@/constants/constants";

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
            <div className="my-12 flex flex-col gap-4 px-4 py-8 md:gap-6 lg:my-20">
              <h1 className="font-heading text-3xl">Expired link</h1>
              <p className="text-lg">
                The verification link you followed is invalid or expired.
              </p>
              <p className="text-lg">
                Need help? Contact us at{" "}
                <span className="font-semibold">{SUPPORT_EMAIL_ADDRESS}</span>.
              </p>
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
