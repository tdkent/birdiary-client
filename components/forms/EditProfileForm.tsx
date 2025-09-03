"use client";

import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import type { ServerResponseWithError } from "@/models/api";
import type { UserProfile } from "@/models/display";
import { editProfileSchema } from "@/models/form";
import { editUserProfile } from "@/actions/profile";
import { GOOGLE_API_KEY } from "@/constants/env";
import { Messages } from "@/models/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleQuestionMark } from "lucide-react";
import TextRemainingLength from "@/components/forms/TextRemainingLength";

type EditProfileFormProps = { user: UserProfile };

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const { bio, name, zipcode } = user;
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      bio: bio || "",
      name: name || "",
      zipcode: zipcode || "",
    },
  });

  const isDirty = form.formState.isDirty;

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof editProfileSchema>) {
    let address;
    if (values.zipcode) {
      address = await new google.maps.Geocoder()
        .geocode({
          address: values.zipcode,
        })
        .then((result) => {
          const isUsState = result.results[0].address_components.find(
            (address) =>
              address.short_name === "US" ||
              address.short_name === "PR" ||
              address.short_name === "VI",
          );
          if (!isUsState) throw new Error();
          return result.results[0].formatted_address as string;
        })
        .catch(() => {
          return toast({
            variant: "destructive",
            title: Messages.ToastErrorTitle,
            description: Messages.ZipCodeNoResultsError,
          });
        });
    }

    const reqBody: Pick<UserProfile, "address" | "bio" | "name" | "zipcode"> = {
      address: (address as string) || null,
      bio: values.bio || null,
      name: values.name || null,
      zipcode: values.zipcode || null,
    };

    const response: UserProfile | ServerResponseWithError =
      await editUserProfile(reqBody);

    if ("error" in response) {
      return toast({
        variant: "destructive",
        title: Messages.ToastErrorTitle,
        description: response.message,
      });
    }
    toast({
      variant: "default",
      title: Messages.ToastSuccessTitle,
      description: "Profile data updated",
    });
    redirect("/profile");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
          name="zipcode"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Zip Code</FormLabel>
                <Popover>
                  <PopoverTrigger className="pr-1 text-sm">
                    <CircleQuestionMark strokeWidth={1.5} size={20} />
                  </PopoverTrigger>
                  <PopoverContent className="text-sm md:text-base">
                    Enter a valid 5-digit U.S. ZIP code to generate your
                    location.
                  </PopoverContent>
                </Popover>
              </div>
              <FormControl>
                <APIProvider apiKey={GOOGLE_API_KEY}>
                  <Input placeholder="10001" {...field} />
                </APIProvider>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="form-item">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  // disabled={pending}
                  rows={5}
                  className="resize-none"
                />
              </FormControl>
              <TextRemainingLength currLength={form.watch("bio")!.length} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!isDirty} size="lg" variant="new">
          Submit
        </Button>
      </form>
    </Form>
  );
}
