import Loading from "@/app/loading";
import VerifyUser from "@/components/pages/auth/VerifyUser";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Email } from "@/schemas/auth.schema";
import { ErrorMessages } from "@/types/error-messages.enum";
import type { Metadata } from "next";
import { Suspense } from "react";

type VerifyEmailViewProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export const metadata: Metadata = {
  title: "Verify your email address - Birdiary",
};

export default async function VerifyEmailView({
  searchParams,
}: VerifyEmailViewProps) {
  const { email, verification } = await searchParams;

  const validateEmail = Email.safeParse(email);

  const regex = /^[0-9a-f]{32}$/;
  if (
    !email ||
    !validateEmail.success ||
    !verification ||
    !verification.match(regex)
  )
    return <ErrorDisplay msg={ErrorMessages.BadRequest} />;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <VerifyUser email={email} verificationId={verification} />
      </Suspense>
    </>
  );
}
