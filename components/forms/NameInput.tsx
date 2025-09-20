// Handles input of common bird names
// Renders form input and selectable autocomplete
import NameAutocomplete from "@/components/forms/NameAutocomplete";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SightingFormProp } from "@/models/form";
import type { Dispatch, SetStateAction } from "react";

type NameInputProps = {
  form: SightingFormProp;
  pending: boolean;
  isMatching: boolean;
  setIsMatching: Dispatch<SetStateAction<boolean>>;
};

export default function NameInput({
  form,
  pending,
  isMatching,
  setIsMatching,
}: NameInputProps) {
  return (
    <>
      <div className="relative z-50">
        <FormField
          control={form.control}
          name="commonName"
          render={({ field }) => (
            <FormItem className="form-item mb-0.5 pb-0">
              <FormLabel className="required-input">
                Common name of bird
              </FormLabel>
              <FormControl>
                <Input {...field} disabled={pending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <NameAutocomplete
          form={form}
          setIsMatching={setIsMatching}
          isMatching={isMatching}
        />
      </div>
    </>
  );
}
