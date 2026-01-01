"use client";

import DateInput from "@/components/forms/DateInput";
import DescInput from "@/components/forms/DescInput";
import FormBirdImage from "@/components/forms/FormBirdImage";
import LocationInput from "@/components/forms/LocationInput";
import NameInput from "@/components/forms/NameInput";
import PendingIcon from "@/components/forms/PendingIcon";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useApi } from "@/context/ApiContext";
import { useAuth } from "@/context/AuthContext";
import birdNames from "@/db/birdNames";
import { createIsoDateFromJsDate } from "@/helpers/date.helpers";
import {
  SightingFormSchema,
  type SightingForm,
} from "@/schemas/sighting.schema";
import { ErrorMessages } from "@/types/error-messages.enum";
import type { NewLocation } from "@/types/location.types";
import type {
  NewSighting,
  SightingWithBirdAndLocation,
} from "@/types/sighting.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type EditSightingFormProps = {
  sighting: SightingWithBirdAndLocation;
};

export default function EditSightingForm({ sighting }: EditSightingFormProps) {
  const {
    bird: { commonName },
    date,
    description,
    location,
  } = sighting;
  const { isSignedIn } = useAuth();
  const [isMatching, setIsMatching] = useState(false);
  const [editLocation, setEditLocation] = useState<NewLocation | undefined>(
    sighting.location ?? undefined,
  );

  const router = useRouter();

  const { useMutation } = useApi();
  const { mutate, pending, error, success } = useMutation({
    route: `/sightings/${sighting.id}`,
    tag: "sightings",
    tagsToUpdate: ["sightings"],
    method: "PATCH",
  });

  const form = useForm<SightingForm>({
    resolver: zodResolver(SightingFormSchema),
    defaultValues: {
      commonName,
      date: new Date(date.slice(0, -1)) || new Date(), // remove "Z" from ISO string
      description: description || "",
      location: location?.name || "",
    },
  });

  const isDirty = form.formState.isDirty;

  const currBirdName = form.getValues("commonName");

  useEffect(() => {
    if (success) {
      router.replace(`/sightings/${sighting.id}`);
    }
  }, [router, sighting.id, success]);

  async function onSubmit(values: SightingForm) {
    let validatedLocation: NewLocation | undefined = editLocation;
    if (!values.location) {
      validatedLocation = undefined;
    }
    // If input has a value and autocomplete is empty, OR
    // input !== autocomplete, short circuit with error
    else if (!editLocation || editLocation.name !== values.location) {
      return form.setError("location", {
        type: "custom",
        message: ErrorMessages.InvalidLocation,
      });
    }

    const formValues: NewSighting = {
      birdId: birdNames.findIndex((name) => name === values.commonName) + 1,
      date: createIsoDateFromJsDate(values.date!),
      description: values.description ? values.description.trim() : null,
      location: validatedLocation,
    };

    mutate(formValues);
    form.reset();
  }

  return (
    <>
      {error && <ErrorDisplay showInline msg={error} />}
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
          <FormBirdImage currBirdName={currBirdName} />
          <Button
            disabled={pending || !isMatching || !isDirty}
            size="lg"
            variant="new"
          >
            {pending ? <PendingIcon strokeWidth={1.5} size={28} /> : "Update"}
          </Button>
        </form>
      </Form>
    </>
  );
}
