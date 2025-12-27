"use client";

import { deleteSessionCookie } from "@/actions/auth";
import { editLocation } from "@/actions/location";
import LocationInput from "@/components/forms/LocationInput";
import PendingIcon from "@/components/forms/PendingIcon";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { type ExpectedServerError } from "@/models/api";
import type { Location } from "@/models/db";
import { type CreateLocationDto } from "@/models/form";
import {
  EditLocationFormSchema,
  type EditLocationForm,
} from "@/schemas/sighting.schema";
import { ErrorMessages } from "@/types/error-messages.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditLocationFormProps = {
  location: Location;
  locationId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

export default function EditLocationForm({
  location,
  locationId,
  setOpen,
  setSuccess,
}: EditLocationFormProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [updatedLocation, setUpdatedLocation] = useState<
    CreateLocationDto | undefined
  >(location ?? undefined);

  const router = useRouter();
  const { signOut } = useAuth();

  const form = useForm<EditLocationForm>({
    resolver: zodResolver(EditLocationFormSchema),
    defaultValues: {
      location: location.name,
    },
  });

  const isDirty = form.formState.isDirty;

  async function onSubmit(values: EditLocationForm) {
    setError(null);
    setPending(true);
    // If input has a value and autocomplete is empty, OR
    // input !== autocomplete, short circuit with error
    if (!updatedLocation || updatedLocation.name !== values.location) {
      return form.setError("location", {
        type: "custom",
        message: ErrorMessages.InvalidLocation,
      });
    }

    try {
      const formValues: { location: CreateLocationDto } = {
        location: updatedLocation,
      };

      const result: ExpectedServerError | Location = await editLocation(
        locationId,
        formValues.location,
      );

      if ("error" in result) {
        if (result.statusCode === 401) {
          toast.error(ErrorMessages.InvalidSession);
          signOut();
          deleteSessionCookie();
          router.replace("/signin");
        }
        return setError(result.message);
      }

      setOpen(false);
      setSuccess(true);
      router.replace(`/locations/${result.id}?page=1&sortBy=dateDesc`);
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setPending(false);
    }
  }

  if (fetchError) throw fetchError;

  return (
    <>
      {error && <ErrorDisplay msg={error} showInline />}
      <Form {...form}>
        <form className="mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          <LocationInput
            form={form}
            pending={pending}
            setLocation={setUpdatedLocation}
            variant="update"
          />
          <Button disabled={!isDirty || pending} size="lg" variant="new">
            {pending ? <PendingIcon strokeWidth={1.5} size={28} /> : "Update"}
          </Button>
        </form>
      </Form>
    </>
  );
}
