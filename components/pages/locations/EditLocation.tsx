"use client";

import EditLocationForm from "@/components/forms/EditLocationForm";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/hooks/use-toast";
import { Messages } from "@/models/api";
import type { Location } from "@/models/db";
import { useEffect, useState } from "react";

type EditLocationProps = {
  location: Location;
  locationId: number;
};

export default function EditLocation({
  location,
  locationId,
}: EditLocationProps) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const { toast } = useToast();

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
      description="Update the address and map of the current location. Sightings associated with this location will also be updated."
      open={open}
      setOpen={setOpen}
      title="Edit Location"
      triggerText="Edit"
    >
      <EditLocationForm
        location={location}
        locationId={locationId}
        setOpen={setOpen}
        setSuccess={setSuccess}
      />
    </Modal>
  );
}
