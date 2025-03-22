// Handles input of common bird names
// Renders form input and selectable autocomplete
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { SightingFormProp } from "@/types/api";

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
              <Input {...field} disabled={pending} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
