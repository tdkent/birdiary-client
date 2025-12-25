"use client";

import { resetPassword } from "@/actions/auth";
import PasswordInput from "@/components/forms/PasswordInput";
import PendingIcon from "@/components/forms/PendingIcon";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
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
import { ExpectedServerError, Messages } from "@/models/api";
import {
  ResetPasswordFormSchema,
  type ResetPasswordForm,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ResetPasswordSubmitPasswordProps = {
  token: string;
};

export default function ResetPasswordSubmitPassword({
  token,
}: ResetPasswordSubmitPasswordProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const router = useRouter();
  const isDirty = form.formState.isDirty;

  async function onSubmit(values: ResetPasswordForm) {
    setPending(true);
    setError(null);
    try {
      const response: { success: boolean } | ExpectedServerError =
        await resetPassword(values.newPassword, token);

      if ("error" in response) {
        console.log(response);
        const msg =
          response.statusCode === 400
            ? Messages.ExpiredResetToken
            : response.message;
        return setError(msg);
      }

      toast.success(Messages.PasswordUpdated);
      form.reset();
      router.replace("/signin");
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormDescription>
            {Messages.ResetPasswordFormDescription}
          </FormDescription>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autocomplete="new-password"
                    field={field}
                    pending={pending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autocomplete="new-password"
                    field={field}
                    pending={pending}
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
            disabled={!isDirty || pending}
          >
            {pending ? <PendingIcon strokeWidth={1.5} size={28} /> : "Update"}
          </Button>
        </form>
      </Form>
    </>
  );
}
