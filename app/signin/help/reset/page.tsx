import { verifyResetPassword } from "@/actions/auth";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type ResetPasswordViewProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function ResetPasswordView({
  searchParams,
}: ResetPasswordViewProps) {
  const { token } = await searchParams;
  const result = await verifyResetPassword(token);

  if ("error" in result) {
    return <ErrorDisplay statusCode={`${result.statusCode}`} />;
  }

  return <>Reset Password</>;
}
