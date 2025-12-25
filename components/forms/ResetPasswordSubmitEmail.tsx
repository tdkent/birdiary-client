"use client";

import { forgotPassword } from "@/actions/auth";
import PendingIcon from "@/components/forms/PendingIcon";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  ForgotPasswordFormSchema,
  type ForgotPasswordForm,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ResetPasswordSubmitEmail() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const email = form.getValues("email");

  async function onSubmit(values: ForgotPasswordForm) {
    setError(null);
    setFetchError(null);
    setPending(true);
    setSuccess(false);
    try {
      const result = await forgotPassword(values.email);
      if ("error" in result) {
        return setError(result.message);
      }
      setSuccess(true);
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setPending(false);
    }
  }

  if (fetchError) throw fetchError;

  return (
    <>
      {error && <ErrorDisplay msg={error} showInline />}
      {success && <EmailDispatched email={email} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormDescription>
            Enter the email address associated with your Birdiary account and we
            will send a link to reset your password.
          </FormDescription>
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
                    disabled={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            variant="new"
            disabled={!email || pending}
          >
            {pending ? <PendingIcon strokeWidth={1.5} size={28} /> : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
}

type EmailDispatchedProps = {
  email: string;
};
function EmailDispatched({ email }: EmailDispatchedProps) {
  return (
    <>
      <Alert className="w-full border-none bg-green-100 text-foreground text-green-900 dark:bg-green-900 dark:text-green-200 md:w-3/4">
        <Mail
          className="stroke-green-900 dark:stroke-green-200"
          size={18}
          strokeWidth={2}
        />
        <AlertTitle className="font-semibold">Check your inbox</AlertTitle>
        <AlertDescription className="font-semibold">
          If we find an account for {email} we will send an email with a link to
          reset your password. If you don&apos;t receive an email after a few
          minutes, check your spam folder or try again.
        </AlertDescription>
      </Alert>
    </>
  );
}
