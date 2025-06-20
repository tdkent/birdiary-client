"use client";

import {
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useApi } from "@/context/ApiContext";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createIsoUtcDate } from "@/helpers/dates";
import type {
  NewSightingFormValues,
  SightingWithLocation,
  Location,
} from "@/types/models";
import { type SightingForm, sightingSchema, apiRoutes } from "@/types/api";
import BirdImage from "@/components/forms/BirdImage";
import NameInput from "@/components/forms/NameInput";
import DateInput from "@/components/forms/DateInput";
import DescInput from "@/components/forms/DescInput";
import LocationInput from "@/components/forms/LocationInput";
import { AuthContext } from "@/context/AuthContext";

type EditSightingFormProps = {
  sighting: SightingWithLocation;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EditSightingForm({
  sighting,
  setOpen,
}: EditSightingFormProps) {
  const { commName, date, desc, location } = sighting;
  const { isSignedIn } = useContext(AuthContext);
  // Check if input matches an allowed common bird name
  const [isMatching, setIsMatching] = useState(false);
  const [editLocation, setEditLocation] = useState<Location | undefined>(
    sighting.location ?? undefined,
  );

  // Hooks
  const { toast } = useToast();
  const { useMutation } = useApi();
  const { mutate, pending, error, success } = useMutation({
    route: apiRoutes.singleSighting(sighting.id),
    tag: "sightings",
    tagsToUpdate: ["sightings"],
    method: "PUT",
  });

  const form = useForm<SightingForm>({
    resolver: zodResolver(sightingSchema),
    defaultValues: {
      commName,
      date: new Date(date),
      desc,
      location: location?.name,
    },
  });

  const isDirty = form.formState.isDirty;

  const currBirdName = form.getValues("commName");

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
        description: "Sighting updated",
      });
    }
  }, [success, toast]);

  async function onSubmit(values: SightingForm) {
    let validatedLocation: Location | undefined = editLocation;
    if (!values.location) {
      validatedLocation = undefined;
    }
    // If input has a value and autocomplete is empty, OR
    // input !== autocomplete, short circuit with error
    else if (!editLocation || editLocation.name !== values.location) {
      return form.setError("location", {
        type: "custom",
        message: "Select a location from the dropdown menu",
      });
    }

    const formValues: NewSightingFormValues = {
      commName: values.commName,
      date: createIsoUtcDate(values.date!),
      desc: values.desc!.trim(),
      location: validatedLocation,
    };

    mutate(formValues);
    form.reset();
    setOpen(false);
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
                setLocation={setEditLocation}
              />
            </>
          )}
          <DescInput form={form} pending={pending} />
          <Button
            disabled={pending || !isMatching || !isDirty}
            className="w-full"
          >
            {pending ? <Loader2 className="animate-spin" /> : "Update Sighting"}
          </Button>
        </form>
      </Form>
    </>
  );
}
