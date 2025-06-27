import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import { FormLabel } from "@/components/ui/form";
import type { Sighting } from "@/types/models";

type TransferStorageType = {
  pathname: "/signup" | "/signin";
};

export default function TransferStorage({ pathname }: TransferStorageType) {
  if (pathname !== "/signin") return null;

  const sightingsInStorage = localStorage.getItem("sightings");
  if (!sightingsInStorage) return null;

  const parsedSightings: Sighting[] = JSON.parse(sightingsInStorage);
  if (!parsedSightings.length) return null;

  return (
    <div className="flex items-center space-x-3">
      <Checkbox />
      <FormLabel>
        Transfer sighting data from browser to your account?
      </FormLabel>
      <Popover>
        <PopoverTrigger>
          <Info strokeWidth={1.5} size={20} />
        </PopoverTrigger>
        <PopoverContent>
          Your browser contains sightings data created when you were logged out
          of your account. By checking this box when signing in, this data will
          be transferred to your account and deleted from your browser.
        </PopoverContent>
      </Popover>
    </div>
  );
}
