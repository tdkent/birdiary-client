"use client";

import { deleteSessionCookie } from "@/actions/auth";
import { deleteLocation } from "@/actions/location";
import PendingIcon from "@/components/forms/PendingIcon";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";
import { Messages, type ExpectedServerError } from "@/models/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DeleteLocationProps = {
  locationId: number;
};

export default function DeleteLocation({ locationId }: DeleteLocationProps) {
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    if (success) {
      toast.success(Messages.LocationDeleted);
    }
  }, [success]);

  const onDelete = async () => {
    setPending(true);
    setError(null);
    try {
      const result: { count: number } | ExpectedServerError =
        await deleteLocation(locationId);

      if ("error" in result) {
        if (result.statusCode === 401) {
          toast.error(Messages.InvalidToken);
          signOut();
          deleteSessionCookie();
          router.replace("/signin");
        }
        return setError(result.message);
      }

      setOpen(false);
      setSuccess(true);
      router.replace("/locations");
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setPending(false);
    }
  };

  if (fetchError) throw fetchError;

  return (
    <>
      <Modal
        buttonSize="lg"
        buttonVariant="destructive"
        description="Delete the current location. Sightings associated with this location will not be deleted."
        open={open}
        setOpen={setOpen}
        title="Delete Location"
        triggerText="Delete"
      >
        {error && <ErrorDisplay showInline msg={error} />}
        <Button
          className={`mt-4 ${pending && "bg-destructive/90"}`}
          disabled={pending}
          onClick={onDelete}
          size="lg"
          variant="destructive"
        >
          {pending ? <PendingIcon strokeWidth={1.5} size={28} /> : "Delete"}
        </Button>
      </Modal>
    </>
  );
}
