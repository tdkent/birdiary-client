import AuthView from "@/components/auth/AuthView";

export default function SignInView() {
  return (
    <AuthView
      title="Sign in to your account"
      footerText="Don't have an account?"
      footerLinkHref="/signup"
      footerLinkLabel="Sign up"
    />
  );
}
