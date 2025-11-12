import { verifyUser } from "@/actions/auth";
import VerifySuccess from "@/components/pages/auth/VerifySuccess";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { notFound } from "next/navigation";

type VerifyUserProps = {
  verificationId: string;
};

export default async function VerifyUser({ verificationId }: VerifyUserProps) {
  const result = await verifyUser(verificationId);

  if ("error" in result) {
    switch (result.statusCode) {
      case 403: {
        return; // Send new verify email
      }
      case 404: {
        return notFound();
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
