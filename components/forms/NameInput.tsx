/*
Handles input of common bird names
Renders form input and selectable autocomplete
*/
import type { UseFormReturn } from "react-hook-form";
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

type NameInputProps = {
  form: UseFormReturn<{
    commName: string;
  }>;
  pending: boolean;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<boolean>>;
};

export default function NameInput({ form, pending, ...rest }: NameInputProps) {
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

      <NameAutocomplete form={form} {...rest} />
    </>
  );
}
