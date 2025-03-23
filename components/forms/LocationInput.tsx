// Handles input of sighting location
import { APIProvider } from "@vis.gl/react-google-maps";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { SightingFormProp } from "@/types/api";
import { GOOGLE_API_KEY } from "@/constants/env";
import LocationAutocomplete from "@/components/forms/LocationAutocomplete";

type NameInputProps = {
  form: SightingFormProp;
  pending: boolean;
};

export default function LocationInput({ form, pending }: NameInputProps) {
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
                <LocationAutocomplete field={field} pending={pending} />
              </APIProvider>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
