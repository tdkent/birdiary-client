import { serverApiRequest } from "@/actions/api.actions";
import InvalidVerificationLink from "@/components/pages/auth/InvalidVerificationLink";
import VerifySuccess from "@/components/pages/auth/VerifySuccess";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import type { ApiResponse } from "@/types/api.types";

type VerifyUserProps = {
  email: string;
  verificationId: string;
};

export default async function VerifyUser({
  email,
  verificationId,
}: VerifyUserProps) {
  const requestBody = { email, verificationId };

  const result: ApiResponse<null> = await serverApiRequest({
    method: "POST",
    requestBody,
    route: "/users/verify-email",
  });

  if (result.error) {
    if (result.statusCode === 400) return <InvalidVerificationLink isVerify />;
    return <ErrorDisplay msg={result.message} />;
  }

  return <VerifySuccess email={email} />;
}
