"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupFormSchema } from "@/lib/definitions";
import { auth } from "@/actions/auth";
import { AuthContext } from "@/context/AuthContext";
import TransferStorage from "@/components/pages/auth/TransferStorage";
import type { AuthForm } from "@/types/api";
import type { Sighting } from "@/types/models";

export default function AuthForm() {
  const { signIn } = useContext(AuthContext);
  const pathname = usePathname() as "/signup" | "/signin";
  const { toast } = useToast();

  const form = useForm<AuthForm>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      transferStorage: false,
    },
  });

  const sightingsInStorage = () => {
    if (pathname !== "/signin") return null;
    const sightingsInStorage = localStorage.getItem("sightings");
    if (!sightingsInStorage) return null;
    const parsedSightings: Sighting[] = JSON.parse(sightingsInStorage);
    if (!parsedSightings.length) return null;
    return parsedSightings;
  };

  async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    const storageData = values.transferStorage
      ? sightingsInStorage()!.map((s) => {
          return { commName: s.commName, desc: s.desc, date: s.date };
        })
      : null;

    const err = await auth({ ...values, storageData, pathname });

    if (err) {
      return toast({
        variant: "destructive",
        title: "An error occurred",
        description: err.message,
      });
    }

    if (pathname === "/signin") {
      signIn();
      toast({
        variant: "default",
        title: "Success",
        description: "You are now signed in",
      });
      redirect("/diary");
    } else {
      toast({
        variant: "default",
        title: "Success",
        description: "Your account has been created",
      });
      redirect("/signin");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!!sightingsInStorage() && <TransferStorage form={form} />}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
