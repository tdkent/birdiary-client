import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type VerifyStatusViewProps = {
  searchParams: Promise<{ [key: string]: string }>;
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
      <h1>Success</h1>
      <p>
        Email address <span>{email}</span> is now verified.
      </p>
    </>
  );
}
