import Loading from "@/app/loading";
import VerifyUser from "@/components/pages/auth/VerifyUser";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import type { Metadata } from "next";
import { Suspense } from "react";

type VerifyEmailViewProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Verify your email address | Birdiary",
};

export default async function VerifyEmailView({
  params,
}: VerifyEmailViewProps) {
  const verificationId = (await params).id;

  const regex = /^[0-9a-f]{32}$/;
  const validId = verificationId.match(regex);
  if (!validId) {
    return <ErrorDisplay statusCode={400} />;
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
        <VerifyUser verificationId={verificationId} />
      </Suspense>
    </>
  );
}
