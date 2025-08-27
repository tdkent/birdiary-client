"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleQuestionMark } from "lucide-react";
import type { SightingInStorage } from "@/models/display";
import { Messages, type ServerResponseWithError } from "@/models/api";
import { transferStorageData } from "@/actions/profile";
import PendingIcon from "@/components/forms/PendingIcon";

export default function TransferStorageData() {
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  const sightingsInStorage = localStorage.getItem("sightings");
  if (!sightingsInStorage) return null;
  const parsedSightings: SightingInStorage[] = JSON.parse(sightingsInStorage);
  if (!parsedSightings.length) return null;

  const handleClick = async () => {
    setPending(true);
    const result: { count: number } | ServerResponseWithError =
      await transferStorageData(parsedSightings);
    setPending(false);

    if ("error" in result) {
      return toast({
        variant: "destructive",
        title: Messages.ToastErrorTitle,
        description: result.message,
      });
    }

    toast({
      title: Messages.ToastSuccessTitle,
      description: `${result.count} sighting${result.count === 1 ? "" : "s"} transferred.`,
    });

    localStorage.removeItem("sightings");
    localStorage.removeItem("diary");
  };

  return (
    <>
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
            {pending ? (
              <PendingIcon strokeWidth={1.5} size={32} />
            ) : (
              "Transfer Data"
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
