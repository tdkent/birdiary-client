"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { useApi } from "@/context/ApiContext";
import { Button } from "@/components/ui/button";
// import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";
import type { Location } from "@/types/models";
import {
  type EditLocationFormSchema,
  type ExpectedServerError,
  editLocationSchema,
  // apiRoutes,
} from "@/types/api";
import LocationInput from "@/components/forms/LocationInput";
import { editLocation } from "@/actions/location";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type EditLocationFormProps = {
  location: Location;
  locationId: number;
};

export default function EditLocationForm({
  location,
  locationId,
}: EditLocationFormProps) {
  const [updatedLocation, setUpdatedLocation] = useState<Location | undefined>(
    location ?? undefined,
  );

  // Hooks
  const router = useRouter();
  // const { toast } = useToast();
  // const { useMutation } = useApi();
  // const { mutate, pending, error, success } = useMutation({
  //   route: apiRoutes.singleLocation(locationId),
  //   tag: "locations",
  //   tagsToUpdate: ["locations"],
  //   method: "PUT",
  // });

  const form = useForm<EditLocationFormSchema>({
    resolver: zodResolver(editLocationSchema),
    defaultValues: {
      location: location.name,
    },
  });

  // False if default values of inputs have not been changed
  const isDirty = form.formState.isDirty;

  // Syncronize error toast with API context error
  // useEffect(() => {
  //   if (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "An error occurred",
  //       description: error,
  //     });
  //   }
  // }, [error, toast]);

  // useEffect(() => {
  //   if (success) {
  //     toast({
  //       title: "Success",
  //       description: "New sighting created",
  //     });
  //   }
  // }, [success, toast]);

  async function onSubmit(values: EditLocationFormSchema) {
    // let validatedLocation: Location | undefined = editLocation;
    // if (!values.location) {
    //   validatedLocation = undefined;
    // }
    // If input has a value and autocomplete is empty, OR
    // input !== autocomplete, short circuit with error
    if (!updatedLocation || updatedLocation.name !== values.location) {
      return form.setError("location", {
        type: "custom",
        message: "Select a location from the dropdown menu",
      });
    }

    const formValues: { location: Location } = {
      location: updatedLocation,
    };

    // mutate(formValues);
    const result:
      | ExpectedServerError
      | { message: "ok"; location: Location & { id: number } } =
      await editLocation(locationId, formValues.location);

    if ("error" in result) {
      const msg = Array.isArray(result.message)
        ? result.message.join(",")
        : result.message;

      return (
        <>
          <ErrorDisplay msg={`${result.error}: ${msg}`} />
        </>
      );
    }

    const filterLocationName = result.location.name
      .replaceAll(" ", "-")
      .replaceAll(",", "")
      .replaceAll("_", "");

    const href = `/locations/${filterLocationName}-${result.location.id}?page=1&sortBy=dateDesc`;
    // form.reset();
    router.replace(href);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <LocationInput
            variant="update"
            form={form}
            // pending={pending}
            setLocation={setUpdatedLocation}
          />
          <Button disabled={!isDirty} className="w-full">
            {/* {pending ? <Loader2 className="animate-spin" /> : "Update Location"} */}
            Update Location
          </Button>
        </form>
      </Form>
    </>
  );
}
