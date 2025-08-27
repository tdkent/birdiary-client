import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { SightingFormProp } from "@/models/form";

type DateInputProps = {
  form: SightingFormProp;
  pending: boolean;
};

export default function DateInput({ form, pending }: DateInputProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  return (
    <>
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="form-item">
            <FormLabel className="required-input">
              Date of bird sighting
            </FormLabel>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    disabled={pending}
                    className={cn(
                      "w-full border bg-transparent px-3 py-6 text-left text-base font-normal text-foreground hover:bg-transparent md:h-14 md:text-xl",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50 md:h-5 md:w-5" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    form.setValue("date", date!, { shouldDirty: true });
                    setCalendarOpen(false);
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1950-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
