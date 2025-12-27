"use client";

import { deleteSessionCookie } from "@/actions/auth";
import { transferStorageData } from "@/actions/profile";
import PendingIcon from "@/components/forms/PendingIcon";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/context/AuthContext";
import { type ExpectedServerError } from "@/models/api";
import type { SightingInStorage } from "@/models/display";
import { ErrorMessages } from "@/types/error-messages.enum";
import { CircleQuestionMark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function TransferStorageData() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  const router = useRouter();
  const { signOut } = useAuth();

  const sightingsInStorage = localStorage.getItem("sightings");
  if (!sightingsInStorage) return null;
  const parsedSightings: SightingInStorage[] = JSON.parse(sightingsInStorage);
  if (!parsedSightings.length) return null;

  const handleClick = async () => {
    setError(null);
    setPending(true);
    try {
      const result: { count: number } | ExpectedServerError =
        await transferStorageData(parsedSightings);

      if ("error" in result) {
        if (result.statusCode === 401) {
          toast.error(ErrorMessages.InvalidSession);
          signOut();
          deleteSessionCookie();
          router.replace("/signin");
        }
        return setError(result.message);
      }

      toast.success(
        `Transferred ${result.count} sighting${result.count === 1 ? "" : "s"}`,
      );

      localStorage.removeItem("sightings");
      localStorage.removeItem("diary");
    } catch (error) {
      setFetchError(error as Error);
    } finally {
      setPending(false);
    }
  };

  if (fetchError) throw fetchError;

  return (
    <>
      {error && <ErrorDisplay showInline msg={error} />}
      <div className="my-6 rounded-md border p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h4 className="text-lg md:text-xl">Transfer Browser Data</h4>
          <Popover>
            <PopoverTrigger className="text-sm md:text-base">
              <CircleQuestionMark strokeWidth={1.5} size={20} />
            </PopoverTrigger>
            <PopoverContent className="text-sm md:text-base">
              Sightings logged while signed out are saved only in your browser.
              If your browser&apos;s cache is cleared, this data may be lost.
              You can transfer your sightings to your account for permanent
              storage, after which they will be removed from your browser.
            </PopoverContent>
          </Popover>
        </div>
        <p className="my-6 text-base">
          You have{" "}
          <span className="font-semibold">{parsedSightings.length}</span>{" "}
          sightings saved in your browser ready to be transferred to your
          account. Transfer them now?
        </p>
        <div>
          <Button
            onClick={handleClick}
            disabled={pending}
            size="lg"
            variant="new"
          >
            {pending ? <PendingIcon strokeWidth={1.5} size={28} /> : "Transfer"}
          </Button>
        </div>
      </div>
    </>
  );
}
