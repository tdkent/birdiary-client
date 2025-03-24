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
import type { SightingFormProp } from "@/types/api";
import type { Location } from "@/types/models";
import { GOOGLE_API_KEY } from "@/constants/env";
import LocationAutocomplete from "@/components/forms/LocationAutocomplete";

type NameInputProps = {
  form: SightingFormProp;
  pending: boolean;
  setLocation: Dispatch<SetStateAction<Location | undefined>>;
};

export default function LocationInput({ form, ...rest }: NameInputProps) {
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
