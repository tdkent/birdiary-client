import AuthContainer from "@/components/pages/auth/AuthContainer";

export default function SignUpView() {
  return (
    <AuthContainer
      title="Create a new account"
      footerText="Already have an account?"
      footerLinkHref="/signin"
      footerLinkLabel="Sign in"
    />
  );
}
