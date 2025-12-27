"use client";

import { deleteSessionCookie } from "@/actions/auth";
import { editUserProfile } from "@/actions/profile";
import PendingIcon from "@/components/forms/PendingIcon";
import TextRemainingLength from "@/components/forms/TextRemainingLength";
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
import { Textarea } from "@/components/ui/textarea";
import { FORM } from "@/constants/app.constants";
import CONFIG from "@/constants/config.constants";
import { useAuth } from "@/context/AuthContext";
import type { ExpectedServerError } from "@/models/api";
import type { UserProfile } from "@/models/display";
import {
  EditProfileFormSchema,
  type EditProfileForm,
} from "@/schemas/user.schema";
import { ErrorMessages } from "@/types/error-messages.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIProvider } from "@vis.gl/react-google-maps";
import { CircleQuestionMark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditProfileFormProps = { user: UserProfile };

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const { bio, name, zipcode } = user;

  const form = useForm<EditProfileForm>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      bio: bio || "",
      name: name || "",
      zipcode: zipcode || "",
    },
  });

  const isDirty = form.formState.isDirty;
  const router = useRouter();
  const { signOut } = useAuth();

  async function onSubmit(values: EditProfileForm) {
    setPending(true);
    setError(null);
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
          return toast.error(ErrorMessages.InvalidZip);
        });
    }
    const reqBody: Pick<UserProfile, "address" | "bio" | "name" | "zipcode"> = {
      address: (address as string) || null,
      bio: values.bio || null,
      name: values.name || null,
      zipcode: values.zipcode || null,
    };
    try {
      const response: ExpectedServerError | UserProfile =
        await editUserProfile(reqBody);

      if ("error" in response) {
        if (response.statusCode === 401) {
          toast.error(ErrorMessages.InvalidSession);
          signOut();
          deleteSessionCookie();
          router.replace("/signin");
        }
        return setError(response.message);
      }
      router.push("/profile");
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nickname</FormLabel>
                <FormControl>
                  <Input disabled={pending} {...field} />
                </FormControl>
                <TextRemainingLength
                  allowedLength={24}
                  currLength={form.watch("name")!.length}
                />
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
                  <APIProvider apiKey={CONFIG.GOOGLE_API_KEY}>
                    <Input disabled={pending} {...field} />
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
                    disabled={pending}
                    rows={5}
                    className="resize-none"
                  />
                </FormControl>
                <TextRemainingLength
                  allowedLength={FORM.TEXTAREA_MAX_CHARS}
                  currLength={form.watch("bio")!.length}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={!isDirty || pending}
            size="lg"
            variant="new"
          >
            {pending ? <PendingIcon strokeWidth={1.5} size={28} /> : "Update"}
          </Button>
        </form>
      </Form>
    </>
  );
}
