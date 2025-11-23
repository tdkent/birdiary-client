"use client";

import { forgotPassword } from "@/actions/auth";
import PendingIcon from "@/components/forms/PendingIcon";
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
import { AuthForm, emailFormSchema } from "@/models/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function ResetPasswordSubmitEmail() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const form = useForm<Pick<AuthForm, "email">>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const email = form.getValues("email");

  async function onSubmit(values: z.infer<typeof emailFormSchema>) {
    setError(null);
    setFetchError(null);
    setPending(true);
    try {
      const result = await forgotPassword(values.email);
      console.log(result);
      if ("error" in result) {
        return setError(result.message);
      }
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setPending(false);
    }
  }

  if (fetchError) throw fetchError;

  return (
    <>
      {error && <ErrorDisplay authErrorMessage={error} showInline />}
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
