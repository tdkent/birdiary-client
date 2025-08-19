"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { deleteAccount } from "@/actions/profile";
import { signOut } from "@/actions/auth";
import { Messages } from "@/models/api";

export default function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const handleClick = async () => {
    const result = await deleteAccount();

    if ("error" in result) {
      return toast({
        variant: "destructive",
        title: Messages.ToastErrorTitle,
        description: result.message,
      });
    }

    signOut();
  };

  return (
    <>
      <div className="my-8 rounded-md border border-destructive p-2">
        <h4 className="text-xl font-semibold text-destructive">
          Delete Account
        </h4>
        <p>Permanently delete your account and all sighting data.</p>
        <Modal
          buttonSize="default"
          buttonVariant="destructive"
          buttonStyles=""
          description="Warning: this action will immediately and permanently delete your account and sightings data."
          open={open}
          setOpen={setOpen}
          title="Delete Account"
          triggerText="Delete account"
        >
          <Button variant="destructive" onClick={handleClick}>
            Delete account
          </Button>
        </Modal>
      </div>
    </>
  );
}
