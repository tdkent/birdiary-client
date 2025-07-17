import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { SightingFormProp } from "@/models/form";

type DescInputProps = {
  form: SightingFormProp;
  pending: boolean;
};

export default function DescInput({ form, pending }: DescInputProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="form-item">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                disabled={pending}
                rows={5}
                className="resize-none"
              />
            </FormControl>
            <FormDescription>150 characters remaining</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
