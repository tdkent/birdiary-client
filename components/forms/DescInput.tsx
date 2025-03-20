import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { SightingFormProp } from "@/types/api";

type DescInputProps = {
  form: SightingFormProp;
  pending: boolean;
};

export default function DescInput({ form, pending }: DescInputProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="desc"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormDescription>
              Add somes notes about your sighting (max 150 characters).
            </FormDescription>
            <FormControl>
              <Textarea {...field} disabled={pending} rows={4} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
