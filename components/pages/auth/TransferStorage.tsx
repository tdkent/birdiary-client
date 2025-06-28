import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import type { AuthFormProp } from "@/types/api";

type TransferStorageType = {
  form: AuthFormProp;
};

export default function TransferStorage({ form }: TransferStorageType) {
  return (
    <>
      <FormField
        control={form.control}
        name="transferStorage"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-2 space-y-0">
            <FormControl>
              <Checkbox
                onCheckedChange={(checked) => field.onChange(checked)}
              />
            </FormControl>
            <FormLabel>
              Transfer sighting data from browser to your account?
            </FormLabel>
            <Popover>
              <PopoverTrigger>
                <Info strokeWidth={1.5} size={20} />
              </PopoverTrigger>
              <PopoverContent>
                Your browser contains sightings data created when you were
                logged out of your account. By checking this box when signing
                in, this data will be transferred to your account and deleted
                from your browser.
              </PopoverContent>
            </Popover>
          </FormItem>
        )}
      />
    </>
  );
}
