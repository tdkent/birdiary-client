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
import { signupFormSchema } from "@/models/form";
import { auth } from "@/actions/auth";
import { AuthContext } from "@/context/AuthContext";
import TransferStorage from "@/components/pages/auth/TransferStorage";
import type { AuthForm } from "@/models/form";
import type { SightingInStorage } from "@/models/display";

export default function AuthForm() {
  const { signIn } = useContext(AuthContext);
  const pathname = usePathname() as "/signup" | "/signin";
  const { toast } = useToast();

  const form = useForm<AuthForm>({
    resolver: zodResolver(signupFormSchema),
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
    const parsedSightings: SightingInStorage[] = JSON.parse(sightingsInStorage);
    if (!parsedSightings.length) return null;
    return parsedSightings;
  };

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    const storageData = values.transferStorage
      ? sightingsInStorage()!.map((s) => {
          return {
            id: s.id,
            birdId: s.birdId,
            description: s.description,
            date: s.date,
          };
        })
      : null;

    const result = await auth({ ...values, storageData, pathname });

    if (result && "error" in result) {
      return toast({
        variant: "destructive",
        title: "An error occurred",
        description: result.message,
      });
    }

    if (pathname === "/signin") {
      signIn();
      if (result!.count) {
        localStorage.removeItem("sightings");
        localStorage.removeItem("diary");
      }
      toast({
        variant: "default",
        title: "Success",
        description: `You are signed in.${result!.count ? ` Transferred ${result!.count} sightings.` : ""}`,
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
