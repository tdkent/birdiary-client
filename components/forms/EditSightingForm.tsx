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
import birdNames from "@/data/birds";
import { createPureIsoDate } from "@/helpers/dates";
import { apiRoutes, Messages } from "@/models/api";
import type { SightingWithBirdAndLocation } from "@/models/display";
import type { CreateLocationDto, CreateSightingDto } from "@/models/form";
import { sightingSchema, type SightingForm } from "@/models/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  const [editLocation, setEditLocation] = useState<
    CreateLocationDto | undefined
  >(sighting.location ?? undefined);

  const router = useRouter();

  const { useMutation } = useApi();
  const { mutate, pending, error, success } = useMutation({
    route: apiRoutes.sighting(sighting.id),
    tag: "sightings",
    tagsToUpdate: ["sightings"],
    method: "PATCH",
  });

  const form = useForm<SightingForm>({
    resolver: zodResolver(sightingSchema),
    defaultValues: {
      commonName,
      date: new Date(date) || new Date(),
      description: description || "",
      location: location?.name || "",
    },
  });

  const isDirty = form.formState.isDirty;

  const currBirdName = form.getValues("commonName");

  useEffect(() => {
    if (success) {
      toast.success("Sighting updated");
      router.replace(`/sightings/${sighting.id}`);
    }
  }, [router, sighting.id, success]);

  async function onSubmit(values: SightingForm) {
    let validatedLocation: CreateLocationDto | undefined = editLocation;
    if (!values.location) {
      validatedLocation = undefined;
    }
    // If input has a value and autocomplete is empty, OR
    // input !== autocomplete, short circuit with error
    else if (!editLocation || editLocation.name !== values.location) {
      return form.setError("location", {
        type: "custom",
        message: Messages.InvalidLocationError,
      });
    }

    const formValues: CreateSightingDto = {
      birdId: birdNames.findIndex((name) => name === values.commonName) + 1,
      date: createPureIsoDate(values.date!),
      description: values.description ? values.description.trim() : null,
      location: validatedLocation,
    };

    mutate(formValues);
    form.reset();
  }

  return (
    <>
      {error && <ErrorDisplay showInline statusCode={error} />}
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
