"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { deleteAccount } from "@/actions/profile";
import { signOut } from "@/actions/auth";
import { Messages } from "@/models/api";
import PendingIcon from "@/components/forms/PendingIcon";

export default function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  const handleClick = async () => {
    setPending(true);
    const result = await deleteAccount();
    setPending(false);
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
          description="Warning: this action will immediately and permanently delete your account and sightings data."
          open={open}
          setOpen={setOpen}
          title="Delete Account"
          triggerText="Delete account"
        >
          <Button
            className={`${pending && "bg-destructive/90"} mt-4`}
            disabled={pending}
            size="lg"
            onClick={handleClick}
            variant="destructive"
          >
            {pending ? (
              <PendingIcon strokeWidth={1.5} size={40} />
            ) : (
              "Delete account"
            )}
          </Button>
        </Modal>
      </div>
    </>
  );
}
