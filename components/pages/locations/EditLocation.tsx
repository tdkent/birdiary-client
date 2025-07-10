"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import EditLocationForm from "@/components/forms/EditLocationForm";
import type { Location } from "@/models/db";

type EditLocationProps = {
  location: Location;
  locationId: number;
};

export default function EditLocation({
  location,
  locationId,
}: EditLocationProps) {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      triggerText="edit"
      title="Edit Location"
      description="Update location address and map."
    >
      <EditLocationForm location={location} locationId={locationId} />
    </Modal>
  );
}
