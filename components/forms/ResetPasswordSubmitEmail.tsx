"use client";

import PendingIcon from "@/components/forms/PendingIcon";
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
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const form = useForm<Pick<AuthForm, "email">>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const email = form.getValues("email");

  async function onSubmit(values: z.infer<typeof emailFormSchema>) {
    setFetchError(null);
    setPending(true);
    try {
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setPending(false);
    }
  }

  if (fetchError) throw fetchError;

  return (
    <>
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
