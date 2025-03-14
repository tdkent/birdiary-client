"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useApi } from "@/context/ApiContext";
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
import type { NewSighting } from "@/types/models";

const quickSightingSchema = z.object({
  commName: z.string().min(1),
});

export default function QuickSightingForm() {
  const { toast } = useToast();
  const { useMutation } = useApi();
  const { mutate, pending, error } = useMutation({
    route: "/sightings",
    key: "sightings",
    tagsToUpdate: ["sightings"],
    method: "POST",
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: error,
      });
    }
  }, [error, toast]);

  const form = useForm<z.infer<typeof quickSightingSchema>>({
    resolver: zodResolver(quickSightingSchema),
    defaultValues: {
      commName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof quickSightingSchema>) {
    // Date is UTC format: "YYYY-MM-DDT00:00:00.000Z"
    const formValues: NewSighting = {
      // TODO: update birdId
      birdId: Math.floor(Math.random() * 838 + 10000),
      commName: values.commName,
      date: createUtcDate(new Date()),
      desc: "",
    };

    mutate(formValues);

    form.resetField("commName");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button disabled={pending} className="w-full">
          {pending ? <Loader2 className="animate-spin" /> : "Quick Add"}
        </Button>
      </form>
    </Form>
  );
}
