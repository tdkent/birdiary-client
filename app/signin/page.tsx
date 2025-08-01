import AuthContainer from "@/components/pages/auth/AuthContainer";

export default function SignInView() {
  return (
    <AuthContainer
      title="Sign in to your account"
      footerText="Don't have an account?"
      footerLinkHref="/signup"
      footerLinkLabel="Sign up"
    />
  );
}
