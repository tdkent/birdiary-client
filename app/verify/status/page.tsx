import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type VerifyStatusViewProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export const metadata: Metadata = {
  title: "Email successfully verified | Birdiary",
};

export default async function VerifyStatusView({
  searchParams,
}: VerifyStatusViewProps) {
  const { email, result } = await searchParams;

  if (!result || result !== "success" || !email) {
    return <ErrorDisplay statusCode={400} />;
  }

  return (
    <>
      <div className="flex flex-col gap-4 px-4 py-8 md:gap-6">
        <div className="flex items-center gap-2">
          <CircleCheck />
          <h1 className="font-heading text-3xl">Success</h1>
        </div>
        <p className="text-lg">
          Your email address <span className="font-semibold">{email}</span> is
          now verified.
        </p>
        <Button asChild className="my-2" size="lg" variant="secondary">
          <Link href="/signin">Sign in</Link>
        </Button>
      </div>
    </>
  );
}
