// Handles input of sighting location
import { useState } from "react";
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
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  console.log(selectedPlace);
  return (
    <>
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <APIProvider
                apiKey={GOOGLE_API_KEY}
                solutionChannel="GMP_devsite_samples_v3_rgmautocomplete"
              >
                <LocationAutocomplete
                  field={field}
                  pending={pending}
                  setSelectedPlace={setSelectedPlace}
                />
              </APIProvider>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
