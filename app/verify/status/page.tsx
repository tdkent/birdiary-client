import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

type VerifyStatusViewProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export const metadata: Metadata = {
  title: "Email successfully verified - Birdiary",
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
      <ViewWrapper>
        <ViewHeader headingText="Verification Complete" icon={CircleCheck} />
        <div className="flex flex-col gap-6">
          <p className="max-md:text-lg">
            Your email address <span className="font-semibold">{email}</span>{" "}
            has been successfully verified.
          </p>
          <p className="max-md:text-lg">
            Use the link below to sign in to your account.
          </p>
          <Button asChild className="my-4" size="lg" variant="secondary">
            <Link href="/signin">Sign in</Link>
          </Button>
        </div>
      </ViewWrapper>
    </>
  );
}
