import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useApi } from "@/context/ApiContext";
import { apiRoutes } from "@/models/api";
import type { SightingWithLocation } from "@/models/display";

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
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: error,
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (success) {
      toast({
        title: "Success",
        description: "Sighting deleted",
      });
      if (routeTo) router.replace(routeTo);
    }
  }, [router, routeTo, success, toast]);

  const onDelete = async () => {
    mutate({});
    setOpen(false);
  };

  return (
    <>
      <Button onClick={onDelete} variant="destructive" disabled={pending}>
        {pending ? "Deleting..." : "Delete"}
      </Button>
    </>
  );
}
