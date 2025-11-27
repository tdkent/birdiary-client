import SupportEmail from "@/components/pages/auth/SupportEmail";

type InvalidVerificationLinkProps = {
  isVerify?: boolean;
};

export default function InvalidVerificationLink({
  isVerify,
}: InvalidVerificationLinkProps) {
  return (
    <>
      <div className="my-12 flex flex-col gap-4 px-4 py-8 md:gap-6 lg:my-20">
        <h1 className="font-heading text-3xl">Invalid Link</h1>
        <p className="text-lg">
          The link you followed is invalid or expired.{" "}
          {isVerify &&
            "You can sign in to your account to receive a new verification email."}
        </p>
        <SupportEmail />
      </div>
    </>
  );
}
