"use client";

import { resendVerification } from "@/actions/auth";
import PendingIcon from "@/components/forms/PendingIcon";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { useState } from "react";

type ExpiredLinkProps = {
  email: string;
  verificationId: string;
};
export default function ExpiredLink({
  email,
  verificationId,
}: ExpiredLinkProps) {
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  async function handleClick() {
    setError(false);
    setPending(true);

    const result = await resendVerification(email, verificationId);
    if ("error" in result || !result.success) {
      setPending(false);
      return setError(true);
    }

    setSuccess(true);
    setPending(false);
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
        {error && <ErrorDisplay showInline />}
        {success ? (
          <>
            <div className="text-green-600">
              <CircleCheck
                className="inline -translate-y-0.5"
                strokeWidth={1.5}
                size={16}
              />
              <p className="ml-1 inline text-base">
                We&apos;ve sent you another verification email. It should arrive
                within a few minutes — be sure to check your spam or junk
                folder.
              </p>
            </div>
          </>
        ) : (
          <Button
            className="my-2"
            disabled={pending}
            onClick={handleClick}
            size="lg"
            variant="secondary"
          >
            {pending ? (
              <PendingIcon strokeWidth={1.5} size={28} />
            ) : (
              "Verify email"
            )}
          </Button>
        )}
      </div>
    </>
  );
}
