import AuthView from "@/components/auth/AuthView";

export default function SignUpView() {
  return (
    <AuthView
      title="Create a new account"
      footerText="Already have an account?"
      footerLinkHref="/signin"
      footerLinkLabel="Sign in"
    />
  );
}
