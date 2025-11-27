"use client";

import { resetPassword } from "@/actions/auth";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ExpectedServerError, Messages } from "@/models/api";
import { resetPasswordFormSchema } from "@/models/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleQuestionMark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type ResetPasswordSubmitPasswordProps = {
  token: string;
};

export default function ResetPasswordSubmitPassword({
  token,
}: ResetPasswordSubmitPasswordProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const router = useRouter();
  const isDirty = form.formState.isDirty;

  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    setPending(true);
    setError(null);
    try {
      const response: { success: boolean } | ExpectedServerError =
        await resetPassword(values.newPassword, token);

      if ("error" in response) {
        return setError(response.statusCode);
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
      {error && <ErrorDisplay showInline statusCode={error} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>New Password</FormLabel>
                  <Popover>
                    <PopoverTrigger className="pr-1 text-sm">
                      <CircleQuestionMark strokeWidth={1.5} size={20} />
                    </PopoverTrigger>
                    <PopoverContent className="text-sm md:text-base">
                      Passwords must be 8-36 characters.
                    </PopoverContent>
                  </Popover>
                </div>
                <FormControl>
                  <Input
                    autoComplete="new-password"
                    disabled={pending}
                    type="password"
                    {...field}
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
                  <Input
                    autoComplete="new-password"
                    disabled={pending}
                    type="password"
                    {...field}
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
