"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

type VerifySuccessProps = {
  email: string;
};

export default function VerifySuccess({ email }: VerifySuccessProps) {
  const router = useRouter();

  const url = `/verify/status?result=success&email=${email}`;

  useEffect(() => router.push(url), [router, url]);

  return null;
}
