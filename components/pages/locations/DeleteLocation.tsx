"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { deleteLocation } from "@/actions/location";
import type { ExpectedServerError } from "@/types/api";

type DeleteLocationProps = {
  locationId: number;
};

export default function DeleteLocation({ locationId }: DeleteLocationProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

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
        description: "Location deleted",
      });
    }
  }, [success, toast]);

  const onDelete = async () => {
    setError(null);
    const result: { count: number } | ExpectedServerError =
      await deleteLocation(locationId);
    setOpen(false);

    if ("error" in result) {
      const msg = Array.isArray(result.message)
        ? result.message.join(",")
        : result.message;
      return setError(msg);
    }

    setSuccess(true);
    router.replace("/locations");
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      triggerText="delete"
      title="Delete Location"
      description="Removes selected location from account and related sightings."
    >
      <Button onClick={onDelete} variant="destructive">
        Delete
      </Button>
    </Modal>
  );
}
