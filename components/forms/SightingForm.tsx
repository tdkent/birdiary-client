"use client";

import { useEffect, useState } from "react";
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

export default function SightingForm() {
  // Check if input matches an allowed common bird name
  const [isMatching, setIsMatching] = useState(false);

  // Hooks
  const { toast } = useToast();
  const { useMutation } = useApi();
  const { mutate, pending, error } = useMutation({
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

  // Validate and submit the form
  async function onSubmit(values: SightingForm) {
    // Date is UTC format: "YYYY-MM-DDT00:00:00.000Z"
    const formValues: NewSighting = {
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
        <NameInput
          form={form}
          pending={pending}
          isMatching={isMatching}
          setIsMatching={setIsMatching}
        />
        <DateInput form={form} pending={pending} />
        <DescInput form={form} pending={pending} />
        <Button disabled={pending || !isMatching} className="w-full">
          {pending ? <Loader2 className="animate-spin" /> : "Add Sighting"}
        </Button>
      </form>
    </Form>
  );
}
