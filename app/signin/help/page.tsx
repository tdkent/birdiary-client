import ResetPasswordSubmitEmail from "@/components/forms/ResetPasswordSubmitEmail";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";

export default function SignInHelpView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader
          headingText="Reset Password"
          descriptionText="Enter the email address associated with your Birdiary account."
        />
        <ResetPasswordSubmitEmail />
      </ViewWrapper>
    </>
  );
}
