// Handles input of sighting location
import type { Dispatch, SetStateAction } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type {
  SightingFormProp,
  EditLocationFormSchemaProp,
  CreateLocationDto,
} from "@/models/form";
import { GOOGLE_API_KEY } from "@/constants/env";
import LocationAutocomplete from "@/components/forms/LocationAutocomplete";

type NameInputProps =
  | {
      variant: "create";
      form: SightingFormProp;
      pending: boolean;
      setLocation: Dispatch<SetStateAction<CreateLocationDto | undefined>>;
    }
  | {
      variant: "update";
      form: EditLocationFormSchemaProp;
      pending?: never;
      setLocation: Dispatch<SetStateAction<CreateLocationDto | undefined>>;
    };

export default function LocationInput({
  form,
  variant,
  ...rest
}: NameInputProps) {
  if (variant === "update") {
    const editForm = form as EditLocationFormSchemaProp;
    return (
      <>
        <FormField
          control={editForm.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <APIProvider apiKey={GOOGLE_API_KEY}>
                  <LocationAutocomplete field={field} {...rest} />
                </APIProvider>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  return (
    <>
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <APIProvider apiKey={GOOGLE_API_KEY}>
                <LocationAutocomplete field={field} {...rest} />
              </APIProvider>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
