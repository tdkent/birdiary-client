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
import { createIsoDateFromJsDate } from "@/helpers/dates";
import { apiRoutes, Messages } from "@/models/api";
import {
  sightingSchema,
  type CreateLocationDto,
  type CreateSightingDto,
  type SightingForm,
} from "@/models/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SightingForm() {
  const { isSignedIn } = useAuth();
  const [isMatching, setIsMatching] = useState(false);
  const [location, setLocation] = useState<CreateLocationDto>();

  const router = useRouter();
  const { useMutation } = useApi();
  const {
    mutate,
    pending,
    error,
    success,
    data: sighting,
  } = useMutation({
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
    if (success) {
      toast.success(Messages.SightingCreated);
      router.push(`sightings/${sighting!.id}`);
    }
  }, [router, sighting, success]);

  async function onSubmit(values: SightingForm) {
    let validatedLocation: CreateLocationDto | undefined = location;
    if (!values.location) {
      validatedLocation = undefined;
    }
    // If input has a value and autocomplete is empty, OR
    // input !== autocomplete, short circuit with error
    else if (!location || location.name !== values.location) {
      return form.setError("location", {
        type: "custom",
        message: Messages.InvalidLocationError,
      });
    }

    const formValues: CreateSightingDto = {
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
                setLocation={setLocation}
              />
            </>
          )}
          <DescInput form={form} pending={pending} />
          <FormBirdImage currBirdName={currBirdName} />
          <Button variant="new" size="lg" disabled={pending || !isMatching}>
            {pending ? <PendingIcon strokeWidth={1.5} size={28} /> : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
}
