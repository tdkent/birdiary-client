import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SightingWithLocation } from "@/models/display";
import { createLocaleString } from "@/helpers/dates";
import Modal from "@/components/ui/Modal";
import EditSightingForm from "@/components/forms/EditSightingForm";
import DeleteItem from "@/components/pages/shared/DeleteItem";

type CsrListItemDetailsProps =
  | {
      variant: "list";
      href: string;
      text: string;
      subtext?: string;
      count?: number;
      sighting?: never;
      hybrid?: never;
    }
  | {
      variant: "card";
      hybrid: "birdDetail" | "diaryDetail";
      sighting: SightingWithLocation;
      href?: never;
      text?: never;
      subtext?: never;
      count?: never;
    };

export default function CsrListItemDetails({
  variant,
  hybrid,
  href,
  text,
  subtext,
  count,
  sighting,
}: CsrListItemDetailsProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  switch (variant) {
    case "list": {
      const sightingCount = count && count > 0 ? count : null;
      return (
        <>
          <li className="my-4">
            <Link href={href}>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium">{text}</span>
                  {subtext && <span className="text-sm italic">{subtext}</span>}
                </div>
                {sightingCount && (
                  <div>
                    <span className="text-sm">
                      {sightingCount > 1
                        ? `${sightingCount} sightings`
                        : "1 sighting"}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </li>
        </>
      );
    }

    case "card": {
      return (
        <>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                {hybrid === "diaryDetail" && <h3>{sighting.commName}</h3>}
                {hybrid === "birdDetail" && (
                  <h3>{createLocaleString(sighting.date, "med")}</h3>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sighting.location && <p>{sighting.location.name}</p>}
              <p>{sighting.description}</p>
            </CardContent>
            <CardFooter className="justify-between">
              <Modal
                open={editModalOpen}
                setOpen={setEditModalOpen}
                triggerText="edit"
                title="Edit Sighting"
                description="Update the details about one of your sightings."
              >
                <EditSightingForm
                  sighting={sighting}
                  setOpen={setEditModalOpen}
                />
              </Modal>
              <Modal
                open={deleteModalOpen}
                setOpen={setDeleteModalOpen}
                triggerText="delete"
                title="Confirm Delete"
                description="This will permanently delete one of your sightings."
              >
                <DeleteItem
                  variant="sighting"
                  item={sighting}
                  setOpen={setDeleteModalOpen}
                />
              </Modal>
            </CardFooter>
          </Card>
        </>
      );
    }

    default:
      throw new Error("Invalid variant");
  }
}
