"use client";

import EditLocationForm from "@/components/forms/EditLocationForm";
import Modal from "@/components/ui/Modal";
import type { Location } from "@/types/location.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

  useEffect(() => {
    if (success) {
      toast.success("Location updated");
    }
  }, [success]);

  return (
    <Modal
      buttonSize="lg"
      buttonVariant="secondary"
      description="Update the address and map of the current location."
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
