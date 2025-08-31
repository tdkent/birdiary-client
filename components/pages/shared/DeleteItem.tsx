import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useApi } from "@/context/ApiContext";
import { apiRoutes } from "@/models/api";
import type { SightingWithLocation } from "@/models/display";
import PendingIcon from "@/components/forms/PendingIcon";

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
  const { toast } = useToast();
  const router = useRouter();
  const { useMutation } = useApi();
  const { mutate, pending, error, success } = useMutation({
    route: apiRoutes.sighting(item.id),
    tag: "sightings",
    tagsToUpdate: ["sightings"],
    method: "DELETE",
  });

  useEffect(() => {
    if (error) {
      setOpen(false);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: error,
      });
    }
  }, [error, setOpen, toast]);

  useEffect(() => {
    if (success) {
      setOpen(false);
      toast({
        title: "Success",
        description: "Sighting deleted",
      });
      if (routeTo) router.replace(routeTo);
    }
  }, [router, routeTo, success, setOpen, toast]);

  const onDelete = async () => {
    mutate({});
  };

  return (
    <>
      <Button
        className="mt-4"
        onClick={onDelete}
        size="lg"
        variant="destructive"
        disabled={pending}
      >
        {pending ? <PendingIcon strokeWidth={1.5} size={40} /> : "Delete"}
      </Button>
    </>
  );
}
