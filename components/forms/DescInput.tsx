import TextRemainingLength from "@/components/forms/TextRemainingLength";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FREE_TEXT_LENGTH } from "@/constants/constants";
import type { FormReturnSightingForm } from "@/schemas/sighting.schema";

type DescInputProps = {
  form: FormReturnSightingForm;
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
            <TextRemainingLength
              allowedLength={FREE_TEXT_LENGTH}
              currLength={form.watch("description")!.length}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
