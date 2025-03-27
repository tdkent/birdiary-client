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
import type { NewSighting, Location } from "@/types/models";
import { type SightingForm, sightingSchema } from "@/types/api";
import BirdImage from "@/components/forms/BirdImage";
import NameInput from "@/components/forms/NameInput";
import DateInput from "@/components/forms/DateInput";
import DescInput from "@/components/forms/DescInput";
import LocationInput from "@/components/forms/LocationInput";
import { AuthContext } from "@/context/AuthContext";

export default function SightingForm() {
  const { isSignedIn } = useContext(AuthContext);
  // Check if input matches an allowed common bird name
  const [isMatching, setIsMatching] = useState(false);
  const [location, setLocation] = useState<Location>();

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

  // Fetch bird data if user has entered a valid name
  const currBirdName = form.getValues("commName");

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
    // Validate the location
    let validatedLocation: Location | undefined = location;
    // If input is empty, do not send a value
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

    const formValues: NewSighting = {
      commName: values.commName,
      date: createUtcDate(values.date!),
      desc: values.desc!.trim(),
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
