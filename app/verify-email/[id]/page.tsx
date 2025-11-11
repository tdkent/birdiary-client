import type { Metadata } from "next";

type VerifyEmailViewProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Verify your email address | Birdiary",
};

export default async function VerifyEmailView({
  params,
}: VerifyEmailViewProps) {
  const { id } = await params;
  return <>Verifying your email...</>;
}
