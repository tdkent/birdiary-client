"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { deleteLocation } from "@/actions/location";
import type { ExpectedServerError } from "@/models/api";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type DeleteLocationProps = {
  locationId: number;
};

export default function DeleteLocation({ locationId }: DeleteLocationProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (success) {
      toast({
        title: "Success",
        description: "Location deleted",
      });
    }
  }, [success, toast]);

  const onDelete = async () => {
    setError(null);
    try {
      const result: { count: number } | ExpectedServerError =
        await deleteLocation(locationId);

      if ("error" in result) {
        return setError(`${result.statusCode}`);
      }

      setOpen(false);
      setSuccess(true);
      router.replace("/locations");
    } catch (error) {
      setFetchError(error as Error);
    }
  };

  if (fetchError) throw fetchError;

  return (
    <>
      <Modal
        buttonSize="lg"
        buttonVariant="destructive"
        description="Removes selected location from account and related sightings."
        open={open}
        setOpen={setOpen}
        title="Delete Location"
        triggerText="delete"
      >
        {error && <ErrorDisplay showInline statusCode={error} />}
        <Button
          className="mt-4"
          onClick={onDelete}
          size="lg"
          variant="destructive"
        >
          Delete
        </Button>
      </Modal>
    </>
  );
}
