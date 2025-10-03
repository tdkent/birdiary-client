import AuthForm from "@/components/forms/AuthForm";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign in to your account | Birdiary",
};

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
