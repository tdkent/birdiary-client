type VerifyNewUserViewProps = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function VerifyNewUserView({
  searchParams,
}: VerifyNewUserViewProps) {
  const { email } = await searchParams;

  return (
    <>
      <section className="flex flex-col gap-4 px-4 py-8 md:gap-6">
        <h1 className="font-heading text-3xl">Please verify your account</h1>
        <p className="text-lg">Welcome to Birdiary!</p>
        <p className="text-lg">
          Please check your inbox at{" "}
          <span className="font-semibold">{email}</span> for an email with a
          link you can use to verify your new account. The email should arrive
          in the next few minutes.
        </p>
        <p className="text-lg">
          Didn&apos;t get it? Check your spam or contact us at ...
        </p>
      </section>
    </>
  );
}
