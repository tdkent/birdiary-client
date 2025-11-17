"use client";

import { resendVerification } from "@/actions/auth";
import SupportEmail from "@/components/pages/auth/SupportEmail";
import { useEffect } from "react";

type ExpiredLinkProps = {
  email: string;
  verificationId: string;
};

export default function ExpiredVerificationLink({
  email,
  verificationId,
}: ExpiredLinkProps) {
  useEffect(() => {
    resendVerification(email, verificationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 px-4 py-8 md:gap-6">
        <h1 className="font-heading text-3xl">Expired link</h1>
        <p className="text-lg">
          The verification link you followed has expired. A new link has been
          sent to <span className="font-semibold">{email}</span>.
        </p>
        <p className="text-lg">
          Check your spam folder if the email does not arrive after a few
          minutes.
        </p>
        <SupportEmail />
      </div>
    </>
  );
}
