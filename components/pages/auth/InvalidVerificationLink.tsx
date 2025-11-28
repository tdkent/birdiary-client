import SupportEmail from "@/components/pages/auth/SupportEmail";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";

type InvalidVerificationLinkProps = {
  isVerify?: boolean;
};

export default function InvalidVerificationLink({
  isVerify,
}: InvalidVerificationLinkProps) {
  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="Invalid Link" />
        <div className="flex flex-col gap-4">
          <p className="text-lg">
            The link you followed is invalid or expired.{" "}
            {isVerify &&
              "You can sign in to your account to receive a new verification email."}
          </p>
          <SupportEmail />
        </div>
      </ViewWrapper>
    </>
  );
}
