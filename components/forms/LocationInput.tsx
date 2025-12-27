import LocationAutocomplete from "@/components/forms/LocationAutocomplete";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CONFIG from "@/constants/config.constants";
import type { CreateLocationDto } from "@/models/form";
import type {
  FormReturnEditLocationForm,
  FormReturnSightingForm,
} from "@/schemas/sighting.schema";
import { APIProvider } from "@vis.gl/react-google-maps";
import type { Dispatch, SetStateAction } from "react";

type NameInputProps =
  | {
      variant: "create";
      form: FormReturnSightingForm;
      pending: boolean;
      setLocation: Dispatch<SetStateAction<CreateLocationDto | undefined>>;
    }
  | {
      variant: "update";
      form: FormReturnEditLocationForm;
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
    const editForm = form as FormReturnEditLocationForm;
    return (
      <>
        <FormField
          control={editForm.control}
          name="location"
          render={({ field }) => (
            <FormItem className="form-item">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <APIProvider apiKey={CONFIG.GOOGLE_API_KEY}>
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
              <APIProvider apiKey={CONFIG.GOOGLE_API_KEY}>
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
