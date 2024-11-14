"use client";

import { useContext } from "react";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupFormSchema } from "@/lib/definitions";
import { auth } from "@/actions/auth";
import { AuthContext } from "@/context/auth";

export default function AuthForm() {
  const { signIn } = useContext(AuthContext);
  const pathname = usePathname() as "/signup" | "/signin";
  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    const err = await auth({ ...values, pathname });

    if (err) {
      return toast({
        variant: "destructive",
        title: "An error occurred",
        description: `${err.message} (Error Code ${err.statusCode})`,
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
