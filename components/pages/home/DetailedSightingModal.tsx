"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import SightingForm from "@/components/forms/SightingForm";

export default function DetailedSightingModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        open={open}
        setOpen={setOpen}
        triggerText="+ Add detailed sighting"
        title="Add New Sighting"
        description="Add a new bird sighting to your diary."
      >
        <SightingForm />
      </Modal>
    </>
  );
}
