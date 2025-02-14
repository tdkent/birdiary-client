"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { createUtcDate } from "@/helpers/dates";
import { NestResError } from "@/models/error";
import useFormRouter, { type FormAction } from "@/hooks/useFormRouter";
import apiRoutes from "@/constants/api";

const simpleSightingSchema = z.object({
  commonName: z.string().min(1),
});

export type Sighting = {
  bird_id: number;
  commonName: string;
  date: Date;
  location?: string;
  desc?: string;
};

export default function SimpleSightingForm() {
  const { isPending, setIsPending, checkAuthAndSubmit } = useFormRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof simpleSightingSchema>>({
    resolver: zodResolver(simpleSightingSchema),
    defaultValues: {
      commonName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof simpleSightingSchema>) {
    setIsPending(true);

    // Date is UTC format: "YYYY-MM-DDT00:00:00.000Z"
    //! bird_id is currently hard coded; should be included when name is fetched
    const formValues: Sighting = {
      bird_id: 11,
      commonName: values.commonName,
      date: createUtcDate(new Date()),
    };

    // Explicity set generic type <T> to be Sighting
    const requestData: FormAction<Sighting> = {
      formValues,
      method: "POST",
      route: apiRoutes.SIGHTING,
      key: "sightings",
    };

    const err: NestResError | undefined = await checkAuthAndSubmit(requestData);

    if (err) {
      toast({
        variant: "destructive",
        title: `Error: ${err.error}`,
        description: `${err.message} (Error Code ${err.statusCode})`,
      });
    } else {
      form.reset();
    }

    return setIsPending(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="commonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Common Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="w-full">
          {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
