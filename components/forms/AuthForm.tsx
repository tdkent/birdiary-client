"use client";

import { auth } from "@/actions/auth";
import PasswordInput from "@/components/forms/PasswordInput";
import PendingIcon from "@/components/forms/PendingIcon";
import Turnstile from "@/components/pages/auth/Turnstile";
import UnverifiedAccount from "@/components/pages/auth/UnverifiedAccount";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Messages } from "@/models/api";
import type { AuthForm } from "@/models/form";
import { authFormSchema } from "@/models/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AuthForm() {
  const [cftToken, setCftToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [pending, setPending] = useState(false);
  const [isThrottled, setIsThrottled] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

  const { signIn } = useAuth();
  const pathname = usePathname() as "/signup" | "/signin";
  const router = useRouter();

  const form = useForm<AuthForm>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = form.getValues().email;
  const password = form.getValues().password;

  async function onSubmit(values: z.infer<typeof authFormSchema>) {
    setError(null);
    setVerificationError(false);
    setFetchError(null);
    setPending(true);
    try {
      if (!cftToken) return setError(Messages.InvalidRequest);
      const result = await auth({ ...values, cftToken, pathname });
      if ("error" in result) {
        if (result.message === Messages.CftTokenTimeoutError) {
          setIsExpired(true); // Refresh widget
          return setError(Messages.BadRequestFailedValidation);
        }
        if (result.statusCode === 429) {
          setIsThrottled(true);
        }
        return setError(result.message);
      }
      if ("email" in result) {
        if (pathname !== "/signup") throw new Error();
        return router.replace(`/verify/new?email=${result.email}`);
      }
      if ("success" in result) {
        return setVerificationError(true);
      }
      setIsValidated(true);
      signIn();
      router.replace("/diary");
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setPending(false);
    }
  }

  if (fetchError) throw fetchError;

  const btnText = pathname === "/signin" ? "Sign In" : "Sign Up";

  return (
    <>
      <div className="flex flex-col gap-8">
        {error && (
          <ErrorDisplay
            isThrottled={isThrottled}
            setIsThrottled={setIsThrottled}
            msg={error}
            showInline
          />
        )}
        {verificationError && <UnverifiedAccount />}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      aria-required
                      autoComplete="email"
                      disabled={isThrottled || pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      autocomplete="current-password"
                      field={field}
                      pending={isThrottled || pending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="favoriteColor"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input
                      {...field}
                      aria-hidden
                      disabled={isThrottled || pending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Turnstile
              isExpired={isExpired}
              isValidated={isValidated}
              setIsExpired={setIsExpired}
              setToken={setCftToken}
            />
            <Button
              type="submit"
              size="lg"
              variant="new"
              disabled={
                !cftToken || !email || isThrottled || !password || pending
              }
            >
              {pending ? <PendingIcon strokeWidth={1.5} size={28} /> : btnText}
            </Button>
          </form>
        </Form>
        {pathname === "/signup" && (
          <p className="mt-12 text-sm">
            By signing up, you agree to the{" "}
            <Link className="link-inline" href="/legal">
              Terms of Service &amp; Privacy Policy
            </Link>
            .
          </p>
        )}
      </div>
    </>
  );
}
