"use client";

import { useContext, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/auth";
import { create, type Sighting } from "@/actions/sightings";
import { createUtcDate } from "@/helpers/dates";

const simpleSightingSchema = z.object({
  commonName: z.string().min(1),
});

export default function SimpleSightingForm() {
  const [isPending, setIsPending] = useState(false);
  const { token } = useContext(AuthContext);

  const form = useForm<z.infer<typeof simpleSightingSchema>>({
    resolver: zodResolver(simpleSightingSchema),
    defaultValues: {
      commonName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof simpleSightingSchema>) {
    setIsPending(true);
    const formValues: Sighting = {
      bird_id: 1, // bird id is currently hard coded; should be included when name is fetched
      commonName: values.commonName,
      date: createUtcDate(new Date()),
    };

    await create(token, formValues);

    form.reset();
    setIsPending(false);
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
