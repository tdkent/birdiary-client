import Link from "next/link";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import AuthForm from "@/components/forms/AuthForm";

export default function SignInView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="Sign in to your account" />
        <AuthForm />
        <p className="text-base md:text-xl">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="link-inline">
            Sign up
          </Link>
        </p>
      </ViewWrapper>
    </>
  );
}
