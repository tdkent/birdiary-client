import AuthForm from "@/components/forms/AuthForm";
import ViewHeader from "@/components/pages/shared/ViewHeader";
import ViewWrapper from "@/components/pages/shared/ViewWrapper";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register a new account - Birdiary",
};

export default function SignUpView() {
  return (
    <>
      <ViewWrapper>
        <ViewHeader headingText="Create a new account" />
        <AuthForm />
        <p className="text-base md:text-xl">
          Already have an account?{" "}
          <Link href="/signin" className="link-inline">
            Sign in
          </Link>
        </p>
      </ViewWrapper>
    </>
  );
}
