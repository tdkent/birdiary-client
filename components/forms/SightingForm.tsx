"use client";

import { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useApi } from "@/context/ApiContext";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createUtcDate } from "@/helpers/dates";
import type { NewSighting } from "@/types/models";
import { type SightingForm, sightingSchema } from "@/types/api";
import NameInput from "@/components/forms/NameInput";
import DateInput from "@/components/forms/DateInput";
import DescInput from "@/components/forms/DescInput";
import LocationInput from "@/components/forms/LocationInput";
import { AuthContext } from "@/context/AuthContext";

export default function SightingForm() {
  const { isSignedIn } = useContext(AuthContext);
  // Check if input matches an allowed common bird name
  const [isMatching, setIsMatching] = useState(false);

  // Hooks
  const { toast } = useToast();
  const { useMutation } = useApi();
  const { mutate, pending, error, success } = useMutation({
    route: "/sightings",
    key: "sightings",
    tagsToUpdate: ["sightings"],
    method: "POST",
  });

  // useForm is used with Zod
  const form = useForm<SightingForm>({
    resolver: zodResolver(sightingSchema),
    defaultValues: {
      commName: "",
      date: new Date(),
      desc: "",
      location: "",
    },
  });

  // Syncronize error toast with API context error
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: error,
      });
    }
  }, [error, toast]);

  // Syncronize success toast with API context success
  useEffect(() => {
    if (success) {
      toast({
        title: "Success",
        description: "New sighting created",
      });
    }
  }, [success, toast]);

  // Validate and submit the form
  async function onSubmit(values: SightingForm) {
    const formValues: NewSighting = {
      commName: values.commName,
      date: createUtcDate(values.date!),
      desc: values.desc!.trim(),
      location: values.location!,
    };

    mutate(formValues);

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <NameInput
          form={form}
          pending={pending}
          isMatching={isMatching}
          setIsMatching={setIsMatching}
        />
        <DateInput form={form} pending={pending} />
        {isSignedIn && <LocationInput form={form} pending={pending} />}
        <DescInput form={form} pending={pending} />
        <Button disabled={pending || !isMatching} className="w-full">
          {pending ? <Loader2 className="animate-spin" /> : "Add Sighting"}
        </Button>
      </form>
    </Form>
  );
}
