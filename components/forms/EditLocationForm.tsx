"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import type { Location } from "@/models/db";
import { Messages, type ServerResponseWithError } from "@/models/api";
import {
  editLocationSchema,
  type LocationForm,
  type CreateLocationDto,
} from "@/models/form";
import LocationInput from "@/components/forms/LocationInput";
import { editLocation } from "@/actions/location";

type EditLocationFormProps = {
  location: Location;
  locationId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

export default function EditLocationForm({
  location,
  locationId,
  setOpen,
  setError,
  setSuccess,
}: EditLocationFormProps) {
  const [updatedLocation, setUpdatedLocation] = useState<
    CreateLocationDto | undefined
  >(location ?? undefined);
  const router = useRouter();
  const form = useForm<LocationForm>({
    resolver: zodResolver(editLocationSchema),
    defaultValues: {
      location: location.name,
    },
  });

  const isDirty = form.formState.isDirty;

  async function onSubmit(values: LocationForm) {
    setError(null);
    // If input has a value and autocomplete is empty, OR
    // input !== autocomplete, short circuit with error
    if (!updatedLocation || updatedLocation.name !== values.location) {
      return form.setError("location", {
        type: "custom",
        message: Messages.InvalidLocationError,
      });
    }

    const formValues: { location: CreateLocationDto } = {
      location: updatedLocation,
    };

    const result: Location | ServerResponseWithError = await editLocation(
      locationId,
      formValues.location,
    );

    setOpen(false);

    if ("error" in result) {
      const msg = Array.isArray(result.message)
        ? result.message.join(",")
        : result.message;
      return setError(msg);
    }

    setSuccess(true);

    router.replace(
      `/locations/${result.id} ${result.name}?page=1&sortBy=dateDesc`,
    );
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <LocationInput
            variant="update"
            form={form}
            setLocation={setUpdatedLocation}
          />
          <Button disabled={!isDirty} className="w-full">
            Update Location
          </Button>
        </form>
      </Form>
    </>
  );
}
