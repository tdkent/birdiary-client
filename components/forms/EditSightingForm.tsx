"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useApi } from "@/context/ApiContext";
import { Button } from "@/components/ui/button";
import PendingIcon from "@/components/forms/PendingIcon";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { createIsoUtcDate } from "@/helpers/dates";
import type { CreateLocationDto, CreateSightingDto } from "@/models/form";
import { apiRoutes, Messages } from "@/models/api";
import { sightingSchema, type SightingForm } from "@/models/form";
import FormBirdImage from "@/components/forms/FormBirdImage";
import NameInput from "@/components/forms/NameInput";
import DateInput from "@/components/forms/DateInput";
import DescInput from "@/components/forms/DescInput";
import LocationInput from "@/components/forms/LocationInput";
import { AuthContext } from "@/context/AuthContext";
import { SightingWithLocation } from "@/models/display";
import birdNames from "@/data/birds";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type EditSightingFormProps = {
  sighting: SightingWithLocation;
};

export default function EditSightingForm({ sighting }: EditSightingFormProps) {
  const {
    bird: { commonName },
    date,
    description,
    location,
  } = sighting;
  const { isSignedIn } = useContext(AuthContext);
  const [isMatching, setIsMatching] = useState(false);
  const [editLocation, setEditLocation] = useState<
    CreateLocationDto | undefined
  >(sighting.location ?? undefined);

  const { toast } = useToast();
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
      toast({
        title: Messages.ToastSuccessTitle,
        description: "Sighting updated",
      });
      router.replace(`/sightings/${sighting.id}`);
    }
  }, [router, sighting.id, success, toast]);

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
      date: createIsoUtcDate(values.date!),
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
            {pending ? <PendingIcon strokeWidth={1} size={28} /> : "Update"}
          </Button>
        </form>
      </Form>
    </>
  );
}
