// Renders form input and selectable autocomplete
// Location autocomplete use legacy Google Place API
import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import type { ControllerRenderProps } from "react-hook-form";
import type { SightingForm } from "@/types/api";

type LocationAutocompleteProps = {
  field: ControllerRenderProps<SightingForm, "location">;
  pending: boolean;
};

export default function LocationAutocomplete({
  field,
  pending,
}: LocationAutocompleteProps) {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  // useRef returns a mutable object that can persist values across renders
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["name", "formatted_address"],
      componentRestrictions: { country: "us" },
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const newPlace = placeAutocomplete.getPlace();

      // Text to display in input. getPlace() provides `name` and
      // `formatted_address` properties. These may differ from the
      // text displayed by Places Autocomplete.
      let inputText: string = "";
      if (newPlace.formatted_address && newPlace.name) {
        inputText = newPlace.formatted_address.includes(newPlace.name)
          ? newPlace.formatted_address
          : newPlace.name + ", " + newPlace.formatted_address;
      } else {
        // Fallback in case one or more properties are not provided
        inputText = newPlace.formatted_address ?? newPlace.name ?? "";
      }
      // Update `Location` field
      field.onChange(inputText);
    });
  }, [field, placeAutocomplete]);

  return <Input {...field} ref={inputRef} disabled={pending} />;
}
