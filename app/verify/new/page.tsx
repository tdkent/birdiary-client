import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import { Mail } from "lucide-react";
import type { Metadata } from "next";

type VerifyNewUserViewProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export const metadata: Metadata = {
  title: "Verify your email address - Birdiary",
};

export default async function VerifyNewUserView({
  searchParams,
}: VerifyNewUserViewProps) {
  const { email } = await searchParams;

  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="Please Check Your Email" icon={Mail} />
        <div className="flex flex-col gap-8">
          <p className="max-md:text-lg">
            We&apos;ve just sent a message to{" "}
            <span className="font-semibold">{email}</span> with a link to verify
            your new account.
          </p>
          <p className="max-md:text-lg">
            Check your spam folder if the email does not arrive after a few
            minutes.
          </p>
        </div>
      </ViewWrapper>
    </>
  );
}
