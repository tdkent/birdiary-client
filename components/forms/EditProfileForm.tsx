"use client";

import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import type { MutationSuccess, ExpectedServerError } from "@/models/api";
import { editUserProfile } from "@/actions/profile";
import { UserProfile } from "@/models/display";

const formSchema = z.object({
  name: z.string().max(24),
  location: z.string().max(120),
});

type EditProfileFormProps = { user: UserProfile };

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const { name, location } = user;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
      location: location ? location.name : "",
    },
  });

  // False if default values of inputs have not been changed
  const isDirty = form.formState.isDirty;

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response: MutationSuccess | ExpectedServerError =
      await editUserProfile(user.id, values);

    if ("error" in response) {
      return toast({
        variant: "destructive",
        title: "An error occurred",
        description: response.message,
      });
    }

    toast({
      variant: "default",
      title: "Success",
      description: "Profile data updated",
    });
    redirect("/profile");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nickname</FormLabel>
              <FormControl>
                <Input placeholder="Tim" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Alameda, CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isDirty}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
