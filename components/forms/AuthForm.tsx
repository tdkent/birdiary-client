"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupFormSchema } from "@/models/form";
import { auth } from "@/actions/auth";
import { useAuth } from "@/context/AuthContext";
import type { AuthForm } from "@/models/form";
import { Messages } from "@/models/api";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

export default function AuthForm() {
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
                  <Input placeholder="" {...field} />
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
                  <Input placeholder="" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            variant="new"
            disabled={!email || !password}
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
