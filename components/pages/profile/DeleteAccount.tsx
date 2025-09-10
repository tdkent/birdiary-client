"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { deleteAccount } from "@/actions/profile";
import { signOut } from "@/actions/auth";
import { ExpectedServerError } from "@/models/api";
import PendingIcon from "@/components/forms/PendingIcon";
import { User } from "@/models/db";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

export default function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<number | null>(null);

  const handleClick = async () => {
    setError(null);
    setPending(true);
    const result: User | ExpectedServerError = await deleteAccount();
    setPending(false);
    if ("error" in result) {
      return setError(result.statusCode);
    }
    signOut();
  };

  return (
    <>
      {error && <ErrorDisplay showInline statusCode={error} />}
      <div className="my-8 rounded-md border border-destructive p-4 md:p-6">
        <h4 className="text-lg font-semibold text-destructive md:text-xl">
          Delete Account
        </h4>
        <p className="my-6 text-base md:text-lg">
          Permanently delete your account and all sighting data.
        </p>
        <Modal
          buttonSize="lg"
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
