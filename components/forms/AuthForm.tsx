"use client";

import { auth } from "@/actions/auth";
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
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Messages } from "@/models/api";
import type { AuthForm } from "@/models/form";
import { signupFormSchema } from "@/models/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AuthForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const { signIn } = useAuth();
  const pathname = usePathname() as "/signup" | "/signin";
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AuthForm>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = form.getValues().email;
  const password = form.getValues().password;

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    setError(null);
    setFetchError(null);
    setPending(true);
    try {
      const result = await auth({ ...values, pathname });
      if (result && "error" in result) {
        return setError(result.message);
      }
      if (pathname === "/signin") {
        signIn();
        toast({
          variant: "default",
          title: Messages.ToastSuccessTitle,
          description: Messages.SignIn,
        });
        router.replace("/diary");
      } else {
        toast({
          variant: "default",
          title: Messages.ToastSuccessTitle,
          description: Messages.SignUp,
        });
        router.push("/signin");
      }
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    aria-required
                    autoComplete="current-password"
                    disabled={pending}
                    type="password"
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
            disabled={!email || !password || pending}
          >
            {pending ? <PendingIcon strokeWidth={1.5} size={28} /> : btnText}
          </Button>
        </form>
      </Form>
    </>
  );
}
