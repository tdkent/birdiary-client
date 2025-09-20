"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
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
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { useAuth } from "@/context/AuthContext";
import { deleteSessionCookie } from "@/actions/auth";
import PendingIcon from "@/components/forms/PendingIcon";

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
  const { toast } = useToast();
  const { signOut } = useAuth();

  const form = useForm<LocationForm>({
    resolver: zodResolver(editLocationSchema),
    defaultValues: {
      location: location.name,
    },
  });

  const isDirty = form.formState.isDirty;

  async function onSubmit(values: LocationForm) {
    setError(null);
    setPending(true);
    // If input has a value and autocomplete is empty, OR
    // input !== autocomplete, short circuit with error
    if (!updatedLocation || updatedLocation.name !== values.location) {
      return form.setError("location", {
        type: "custom",
        message: Messages.InvalidLocationError,
      });
    }

    try {
      const formValues: { location: CreateLocationDto } = {
        location: updatedLocation,
      };

      const result: Location | ServerResponseWithError = await editLocation(
        locationId,
        formValues.location,
      );

      if ("error" in result) {
        if (result.statusCode === 401) {
          toast({
            variant: "destructive",
            description: Messages.InvalidToken,
          });
          signOut();
          deleteSessionCookie();
          router.replace("/signin");
        }
        return setError(`${result.statusCode}`);
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
      {error && <ErrorDisplay showInline statusCode={error} />}
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
