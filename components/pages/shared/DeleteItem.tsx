import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useApi } from "@/context/ApiContext";
import { apiRoutes } from "@/types/api";
import type { Sighting } from "@/types/models";

type DeleteItemProps = {
  variant: "sighting";
  item: Sighting;
};

export default function DeleteItem({ item }: DeleteItemProps) {
  const { toast } = useToast();
  const { useMutation } = useApi();
  const { mutate, pending, error, success } = useMutation({
    route: apiRoutes.singleSighting(item.id),
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
    }
  }, [success, toast]);

  const onDelete = async () => {
    mutate({});
  };

  return (
    <>
      <Button onClick={onDelete} variant="destructive" disabled={pending}>
        {pending ? "Deleting..." : "Delete"}
      </Button>
    </>
  );
}
