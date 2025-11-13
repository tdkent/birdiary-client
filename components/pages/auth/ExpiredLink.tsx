"use client";

import { resendVerification } from "@/actions/auth";
import { Button } from "@/components/ui/button";

type ExpiredLinkProps = {
  email: string;
  verificationId: string;
};
export default function ExpiredLink({
  email,
  verificationId,
}: ExpiredLinkProps) {
  async function handleClick() {
    const result = await resendVerification(email, verificationId);
  }
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
        <Button
          className="my-2"
          onClick={handleClick}
          size="lg"
          variant="secondary"
        >
          Verify email
        </Button>
      </div>
    </>
  );
}
