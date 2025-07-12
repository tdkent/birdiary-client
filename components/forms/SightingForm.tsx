"use client";

import { useContext, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useApi } from "@/context/ApiContext";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createIsoUtcDate } from "@/helpers/dates";
import type { Location } from "@/models/db";
import {
  sightingSchema,
  type SightingForm,
  type CreateSightingDto,
} from "@/models/form";
import BirdImage from "@/components/forms/BirdImage";
import NameInput from "@/components/forms/NameInput";
import DateInput from "@/components/forms/DateInput";
import DescInput from "@/components/forms/DescInput";
import LocationInput from "@/components/forms/LocationInput";
import { AuthContext } from "@/context/AuthContext";
import birdNames from "@/data/birds";
import { apiRoutes } from "@/models/api";

export default function SightingForm() {
  const { isSignedIn } = useContext(AuthContext);
  const [isMatching, setIsMatching] = useState(false);
  const [location, setLocation] = useState<Location>();

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
      date: new Date(),
      description: "",
      location: "",
    },
  });

  const currBirdName = form.getValues("commonName");

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: error,
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (success) {
      toast({
        title: "Success",
        description: "New sighting created",
      });
    }
  }, [success, toast]);

  async function onSubmit(values: SightingForm) {
    let validatedLocation: Location | undefined = location;
    if (!values.location) {
      validatedLocation = undefined;
    }
    // If input has a value and autocomplete is empty, OR
    // input !== autocomplete, short circuit with error
    else if (!location || location.name !== values.location) {
      return form.setError("location", {
        type: "custom",
        message: "Select a location from the dropdown menu",
      });
    }

    const formValues: CreateSightingDto = {
      birdId: birdNames.findIndex((name) => name === values.commonName) + 1,
      date: createIsoUtcDate(values.date!),
      description: values.description ? values.description.trim() : null,
      location: validatedLocation,
    };

    mutate(formValues);
    form.reset();
  }

  return (
    <>
      <BirdImage currBirdName={currBirdName} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <NameInput
            form={form}
            pending={pending}
            isMatching={isMatching}
            setIsMatching={setIsMatching}
          />
          <DateInput form={form} pending={pending} />
          {isSignedIn && (
            <>
              <LocationInput
                variant="create"
                form={form}
                pending={pending}
                setLocation={setLocation}
              />
            </>
          )}
          <DescInput form={form} pending={pending} />
          <Button disabled={pending || !isMatching} className="w-full">
            {pending ? <Loader2 className="animate-spin" /> : "Add Sighting"}
          </Button>
        </form>
      </Form>
    </>
  );
}
