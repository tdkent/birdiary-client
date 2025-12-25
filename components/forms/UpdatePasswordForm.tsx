"use client";

import { deleteSessionCookie } from "@/actions/auth";
import { updatePassword } from "@/actions/profile";
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
import { useAuth } from "@/context/AuthContext";
import { Messages, type ExpectedServerError } from "@/models/api";
import type { User } from "@/models/db";
import {
  UpdatePasswordFormSchema,
  type UpdatePasswordForm,
} from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdatePasswordForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const form = useForm<UpdatePasswordForm>({
    resolver: zodResolver(UpdatePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { signOut } = useAuth();
  const router = useRouter();
  const isDirty = form.formState.isDirty;

  async function onSubmit(values: UpdatePasswordForm) {
    setPending(true);
    setError(null);
    try {
      const response: User | ExpectedServerError = await updatePassword(
        values.currentPassword,
        values.newPassword,
      );

      if ("error" in response) {
        if (response.statusCode === 401) {
          toast.error(Messages.InvalidToken);
          signOut();
          deleteSessionCookie();
          router.replace("/signin");
        }
        return setError(response.message);
      }

      toast.success(Messages.PasswordUpdated);
      form.reset();
      router.replace("/profile");
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setPending(false);
    }
  }

  if (fetchError) throw fetchError;

  return (
    <>
      {error && <ErrorDisplay showInline msg={error} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormDescription>
            {Messages.ResetPasswordFormDescription}
          </FormDescription>
          <input name="username" type="hidden" value="default" />
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    autocomplete="current-password"
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
