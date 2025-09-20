"use client";

import { deleteSessionCookie, signOut as signOutAction } from "@/actions/auth";
import { deleteAccount } from "@/actions/profile";
import PendingIcon from "@/components/forms/PendingIcon";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ExpectedServerError, Messages } from "@/models/api";
import { User } from "@/models/db";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const { toast } = useToast();
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
          toast({
            variant: "destructive",
            description: Messages.InvalidToken,
          });
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
          triggerText="Delete"
        >
          <Button
            className={`${pending && "bg-destructive/90"} mt-4`}
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
