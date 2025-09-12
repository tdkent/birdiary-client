"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircleQuestionMark } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { updatePassword } from "@/actions/profile";
import type { ExpectedServerError } from "@/models/api";
import type { User } from "@/models/db";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

const formSchema = z
  .object({
    currentPassword: z.string().trim().min(8).max(36),
    newPassword: z.string().trim().min(8).max(36),
    confirmNewPassword: z.string().trim().min(8).max(36),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from old password.",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export default function UpdatePasswordForm() {
  const [error, setError] = useState<number | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { toast } = useToast();
  const isDirty = form.formState.isDirty;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    try {
      const response: User | ExpectedServerError = await updatePassword(
        values.currentPassword,
        values.newPassword,
      );

      if ("error" in response) {
        return setError(response.statusCode);
      }

      toast({
        variant: "default",
        title: "Success",
        description: "Your password has been updated",
      });

      form.reset();
    } catch (error) {
      setFetchError(error as Error);
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
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
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
                  <Input type="password" {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" variant="new" disabled={!isDirty}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
