import { Mail } from "lucide-react";
import type { Metadata } from "next";

type VerifyNewUserViewProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export const metadata: Metadata = {
  title: "Verify your email address | Birdiary",
};

export default async function VerifyNewUserView({
  searchParams,
}: VerifyNewUserViewProps) {
  const { email } = await searchParams;

  return (
    <>
      <section className="my-12 flex flex-col gap-4 px-4 py-8 md:gap-6 lg:my-20">
        <div className="">
          <Mail
            className="inline -translate-y-1.5"
            strokeWidth={1.5}
            size={30}
          />
          <h1 className="ml-2.5 inline font-heading text-3xl">
            Please check your email
          </h1>
        </div>
        <p className="text-lg">
          We&apos;ve just sent a message to{" "}
          <span className="font-semibold">{email}</span> with a link to verify
          your new account.
        </p>
      </section>
    </>
  );
}
