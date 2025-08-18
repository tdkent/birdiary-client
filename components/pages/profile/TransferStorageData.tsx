"use client";

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

export default function TransferStorageData() {
  const { toast } = useToast();
  const sightingsInStorage = localStorage.getItem("sightings");
  if (!sightingsInStorage) return null;
  const parsedSightings: SightingInStorage[] = JSON.parse(sightingsInStorage);
  if (!parsedSightings.length) return null;

  const handleClick = async () => {
    const result: { count: number } | ServerResponseWithError =
      await transferStorageData(parsedSightings);

    if (result && "error" in result) {
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
      <div className="my-8 rounded-md border p-2">
        <h4 className="text-xl">Transfer Storage Data</h4>
        <p>
          Transfer sightings and diary data stored in your browser to your
          account.
        </p>
        <div>
          <Button onClick={handleClick}>Transfer Data</Button>
          <Popover>
            <PopoverTrigger className="text-sm">
              <CircleQuestionMark strokeWidth={1.5} size={20} />
            </PopoverTrigger>
            <PopoverContent>
              Your browser contains sightings data created when you were logged
              out of your account. By checking this box when signing in, this
              data will be transferred to your account and deleted from your
              browser.
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
}
