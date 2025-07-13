"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/context/ApiContext";
import { createIsoUtcDate } from "@/helpers/dates";
import type { CreateSightingDto } from "@/models/form";
import { apiRoutes, Messages } from "@/models/api";
import { sightingSchema, type SightingForm } from "@/models/form";
import NameInput from "@/components/forms/NameInput";
import birdNames from "@/data/birds";

export default function QuickSightingForm() {
  const [isMatching, setIsMatching] = useState(false);

  const { toast } = useToast();
  const { useMutation } = useApi();
  const { mutate, pending, error, success } = useMutation({
    route: apiRoutes.sightings,
    tag: "sightings",
    tagsToUpdate: ["sightings"],
    method: "POST",
  });

  const form = useForm<SightingForm>({
    resolver: zodResolver(sightingSchema),
    defaultValues: {
      commonName: "",
    },
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: Messages.ErrorToastTitle,
        description: error,
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (success) {
      toast({
        title: Messages.Success,
        description: Messages.NewSighting,
      });
    }
  }, [success, toast]);

  async function onSubmit(values: SightingForm) {
    const formValues: CreateSightingDto = {
      birdId: birdNames.findIndex((name) => name === values.commonName) + 1,
      date: createIsoUtcDate(new Date()),
      description: null,
    };
    mutate(formValues);
    form.resetField("commonName");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-2 flex flex-col gap-1.5"
      >
        <NameInput
          form={form}
          pending={pending}
          isMatching={isMatching}
          setIsMatching={setIsMatching}
        />
        <Button disabled={pending || !isMatching} className="w-full">
          {pending ? <Loader2 className="animate-spin" /> : "Add Sighting"}
        </Button>
      </form>
    </Form>
  );
}
