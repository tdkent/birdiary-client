"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Modal from "@/components/ui/Modal";
import EditLocationForm from "@/components/forms/EditLocationForm";
import type { Location } from "@/models/db";
import { Messages } from "@/models/api";

type EditLocationProps = {
  location: Location;
  locationId: number;
};

export default function EditLocation({
  location,
  locationId,
}: EditLocationProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: Messages.ToastErrorTitle,
        description: error,
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (success) {
      toast({
        title: Messages.ToastSuccessTitle,
        description: "Location updated",
      });
    }
  }, [success, toast]);

  return (
    <Modal
      buttonSize="lg"
      buttonVariant="secondary"
      description="Update location address and map."
      open={open}
      setOpen={setOpen}
      title="Edit Location"
      triggerText="edit"
    >
      <EditLocationForm
        location={location}
        locationId={locationId}
        setOpen={setOpen}
        setError={setError}
        setSuccess={setSuccess}
      />
    </Modal>
  );
}
