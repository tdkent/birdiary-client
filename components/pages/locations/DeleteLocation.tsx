"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Modal from "@/components/ui/Modal";
import { deleteLocation } from "@/actions/location";
import { Messages, type ExpectedServerError } from "@/models/api";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { deleteSessionCookie } from "@/actions/auth";
import PendingIcon from "@/components/forms/PendingIcon";

type DeleteLocationProps = {
  locationId: number;
};

export default function DeleteLocation({ locationId }: DeleteLocationProps) {
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const { toast } = useToast();
  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    if (success) {
      toast({
        title: "Success",
        description: "Location deleted",
      });
    }
  }, [success, toast]);

  const onDelete = async () => {
    setPending(true);
    setError(null);
    try {
      const result: { count: number } | ExpectedServerError =
        await deleteLocation(locationId);

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
        return setError(`${result.statusCode}`);
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
        description="Removes selected location from account and related sightings."
        open={open}
        setOpen={setOpen}
        title="Delete Location"
        triggerText="Delete"
      >
        {error && <ErrorDisplay showInline statusCode={error} />}
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
