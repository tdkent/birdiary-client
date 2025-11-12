import { verifyUser } from "@/actions/auth";
import VerifySuccess from "@/components/pages/auth/VerifySuccess";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        return <ExpiredLink email={email} />;
      }
      case 404: {
        return <ErrorDisplay statusCode={404} />;
      }
      default:
        return <ErrorDisplay />;
    }
  }

  return (
    <>
      <VerifySuccess />
    </>
  );
}

type ExpiredLinkProps = {
  email: string;
  verificationId: string;
};

function ExpiredLink({ email, verificationId }: ExpiredLinkProps) {
  return (
    <>
      <div className="flex flex-col gap-4 px-4 py-8 md:gap-6">
        <h1 className="font-heading text-3xl">Expired link</h1>
        <p className="text-lg">
          The verification link you followed has expired.
        </p>
        <p className="text-lg">
          Click the button below to have a new link sent to{" "}
          <span className="font-semibold">{email}</span>.
        </p>
        <Button asChild className="my-2" size="lg" variant="secondary">
          <Link href="">Verify email</Link>
        </Button>
      </div>
    </>
  );
}
