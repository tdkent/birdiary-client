"use client";

import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/auth";
import { create } from "@/actions/sightings";

const simpleSightingSchema = z.object({
  commonName: z.string().min(1),
});

export default function SimpleSightingForm() {
  const { token } = useContext(AuthContext);
  console.log("🚀 ~ SimpleSightingForm ~ token:", token);

  const form = useForm<z.infer<typeof simpleSightingSchema>>({
    resolver: zodResolver(simpleSightingSchema),
    defaultValues: {
      commonName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof simpleSightingSchema>) {
    await create(token, values);
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Submit</Button>
      </form>
    </Form>
  );
}
