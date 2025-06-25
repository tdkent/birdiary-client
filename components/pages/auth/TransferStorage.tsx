import { Checkbox } from "@/components/ui/checkbox";
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
    <div className="flex items-center space-x-2">
      <Checkbox />
      <FormLabel>
        Transfer sighting data from browser to your account?
      </FormLabel>
    </div>
  );
}
