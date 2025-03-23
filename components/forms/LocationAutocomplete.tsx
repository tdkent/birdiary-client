// Renders form input and selectable autocomplete
// Location autocomplete use legacy Google Place API
import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Input } from "@/components/ui/input";
import type { ControllerRenderProps } from "react-hook-form";

type LocationAutocompleteProps = {
  field: ControllerRenderProps<
    {
      commName: string;
      date?: Date | undefined;
      desc?: string | undefined;
      location?: string | undefined;
    },
    "location"
  >;
  pending: boolean;
  setSelectedPlace: (place: google.maps.places.PlaceResult | null) => void;
};

export default function LocationAutocomplete({
  field,
  pending,
  setSelectedPlace,
}: LocationAutocompleteProps) {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  // useRef returns a mutable object that can persist values across renders
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      setSelectedPlace(placeAutocomplete.getPlace());
    });
  }, [setSelectedPlace, placeAutocomplete]);

  return <Input {...field} ref={inputRef} disabled={pending} />;
}
