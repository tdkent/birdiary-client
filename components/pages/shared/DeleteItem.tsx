import PendingIcon from "@/components/forms/PendingIcon";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { useApi } from "@/context/ApiContext";
import { apiRoutes, Messages } from "@/models/api";
import type { SightingWithLocation } from "@/models/display";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "sonner";

type DeleteItemProps = {
  routeTo?: "/sightings";
  item: SightingWithLocation;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteItem({
  routeTo,
  item,
  setOpen,
}: DeleteItemProps) {
  const router = useRouter();
  const { useMutation } = useApi();
  const { mutate, pending, error, success } = useMutation({
    route: apiRoutes.sighting(item.id),
    tag: "sightings",
    tagsToUpdate: ["sightings"],
    method: "DELETE",
  });

  useEffect(() => {
    if (success) {
      setOpen(false);
      toast.success(Messages.SightingDeleted);
      if (routeTo) router.replace(routeTo);
    }
  }, [router, routeTo, success, setOpen]);

  const onDelete = async () => {
    mutate({});
  };

  return (
    <>
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
    </>
  );
}
