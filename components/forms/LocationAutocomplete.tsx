// Renders form input and selectable autocomplete
// Location autocomplete use legacy Google Place API
import { Input } from "@/components/ui/input";
import type { SightingForm } from "@/schemas/sighting.schema";
import type { CreateLocationDto } from "@/types/list-sort.types";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { ControllerRenderProps } from "react-hook-form";

type LocationAutocompleteProps = {
  field:
    | ControllerRenderProps<SightingForm, "location">
    | ControllerRenderProps<{ location: string }, "location">;
  pending?: boolean;
  setLocation: Dispatch<SetStateAction<CreateLocationDto | undefined>>;
};

export default function LocationAutocomplete({
  field,
  pending,
  setLocation,
}: LocationAutocompleteProps) {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  // useRef returns a mutable object that can persist values across renders
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["name", "formatted_address", "geometry"],
      // Restrict results to USA
      componentRestrictions: { country: "us" },
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      const newPlace = placeAutocomplete.getPlace();

      const lat = newPlace.geometry?.location?.lat();
      const lng = newPlace.geometry?.location?.lng();

      // Text to display in input. getPlace() provides `name` and
      // `formatted_address` properties. These may differ from the
      // text displayed by Places Autocomplete.
      let name: string = "";
      if (newPlace.formatted_address && newPlace.name) {
        name = newPlace.formatted_address.includes(newPlace.name)
          ? newPlace.formatted_address
          : newPlace.name + ", " + newPlace.formatted_address;
      } else {
        // Fallback in case one or more properties are not provided
        name = newPlace.formatted_address ?? newPlace.name ?? "";
      }

      // Update `Location` field
      field.onChange(name);

      setLocation({ name, lat, lng });
    });
  }, [field, placeAutocomplete, setLocation]);

  return <Input {...field} ref={inputRef} disabled={pending} />;
}
