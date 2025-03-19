/*
Handles input of common bird names
Renders form input and selectable autocomplete
*/
import type { Dispatch, SetStateAction } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import NameAutocomplete from "@/components/forms/NameAutocomplete";
import type { SightingFormProp } from "@/types/api";

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
      <FormField
        control={form.control}
        name="commName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Common Name</FormLabel>
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
    </>
  );
}
