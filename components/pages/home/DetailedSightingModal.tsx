"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import SightingForm from "@/components/forms/SightingForm";

export default function DetailedSightingModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal
        buttonSize="sm"
        buttonVariant="ghost"
        description="Add a new bird sighting to your diary."
        open={open}
        setOpen={setOpen}
        title="Add New Sighting"
        triggerText="+ Add detailed sighting"
      >
        <SightingForm />
      </Modal>
    </>
  );
}
