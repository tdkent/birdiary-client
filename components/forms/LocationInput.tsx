import type { Dispatch, SetStateAction } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Button } from "@/components/ui/button";
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
      pending: boolean;
      setLocation: Dispatch<SetStateAction<CreateLocationDto | undefined>>;
    };

/** Handles input of sighting location. */
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
            <FormItem className="form-item">
              <FormLabel>Location of sighting</FormLabel>
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

  const handleClear = () => {
    form.setValue("location", "", { shouldDirty: true });
    rest.setLocation(undefined);
  };

  return (
    <>
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem className="form-item">
            <div className="flex items-center justify-between">
              <FormLabel>Location of sighting</FormLabel>
              <Button
                className="pr-2 text-sm"
                onClick={handleClear}
                size="sm"
                variant="ghost"
                type="button"
              >
                clear
              </Button>
            </div>
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
