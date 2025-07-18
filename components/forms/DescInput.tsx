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
import { DESCRIPTION_LENGTH } from "@/constants/constants";

type DescInputProps = {
  form: SightingFormProp;
  pending: boolean;
};

export default function DescInput({ form, pending }: DescInputProps) {
  const length = form.watch("description")!.length;
  const remainingLength = DESCRIPTION_LENGTH - length;
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
            <FormDescription
              className={`${remainingLength < 0 && "text-destructive"} px-2 text-xs`}
            >
              {remainingLength >= 0
                ? `${DESCRIPTION_LENGTH - length} characters remaining`
                : `${length - DESCRIPTION_LENGTH} characters too many!`}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
