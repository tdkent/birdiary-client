"use client";

import { deleteSessionCookie, signOut as signOutAction } from "@/actions/auth";
import { deleteAccount } from "@/actions/profile";
import PendingIcon from "@/components/forms/PendingIcon";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";
import { ExpectedServerError, Messages } from "@/models/api";
import { User } from "@/models/db";
import { CircleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const router = useRouter();
  const { signOut } = useAuth();

  const handleClick = async () => {
    setError(null);
    setPending(true);
    try {
      const result: User | ExpectedServerError = await deleteAccount();
      setPending(false);
      if ("error" in result) {
        if (result.statusCode === 401) {
          toast.error(Messages.InvalidToken);
          signOut();
          deleteSessionCookie();
          router.replace("/signin");
        }
        return setError(result.statusCode);
      }
      signOutAction();
    } catch (error) {
      setFetchError(error as Error);
    }
  };

  if (fetchError) throw fetchError;

  return (
    <>
      {error && <ErrorDisplay showInline statusCode={error} />}
      <div className="my-8 rounded-md border border-destructive p-4 md:p-6">
        <h4 className="text-lg font-semibold text-destructive md:text-xl">
          Delete Account
        </h4>
        <p className="mt-4 text-base md:text-lg">
          Permanently delete your account and all sighting data.
        </p>
        <p className="mb-6 mt-4 text-sm md:text-base">
          <CircleAlert
            className="mr-1.5 inline size-3.5 -translate-y-[1px] md:size-4 md:-translate-y-[2px]"
            strokeWidth={1.5}
          />
          Remember to export your sightings data before taking this action.
        </p>
        <Modal
          buttonSize="lg"
          buttonVariant="destructive"
          description="Warning: this action will immediately and permanently delete your account and sightings data."
          open={open}
          setOpen={setOpen}
          title="Delete Account"
          triggerText="Delete"
        >
          <Button
            className={`${pending && "bg-destructive/90"}`}
            disabled={pending}
            size="lg"
            onClick={handleClick}
            variant="destructive"
          >
            {pending ? <PendingIcon strokeWidth={1.5} size={28} /> : "Delete"}
          </Button>
        </Modal>
      </div>
    </>
  );
}
