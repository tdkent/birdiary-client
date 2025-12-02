"use client";

import { signOut as signOutAction } from "@/actions/auth";
import { getSighting } from "@/actions/sighting";
import BirdImage from "@/components/forms/BirdImage";
import StaticBirdImage from "@/components/image/StaticBirdImage";
import DeleteItem from "@/components/pages/shared/DeleteItem";
import DescriptionListItem from "@/components/pages/shared/DescriptionListItem";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import Pending from "@/components/pages/shared/Pending";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";
import {
  convertSightingDateToInteger,
  createLocaleString,
} from "@/helpers/dates";
import { Messages } from "@/models/api";
import type { SightingWithBirdAndLocation } from "@/models/display";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type SightingProps = {
  sightingId: number;
};

/** Fetch and display sighting data. */
export default function SightingDetails({ sightingId }: SightingProps) {
  const { isSignedIn, signOut } = useAuth();

  const [data, setData] = useState<SightingWithBirdAndLocation | null>(null);
  const [error, setError] = useState<number | string | null>(null);
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function query() {
      setError(null);
      if (isSignedIn) {
        setPending(true);
        try {
          const result = await getSighting(sightingId);

          if ("error" in result) {
            if (result.statusCode === 401) {
              toast.error(Messages.InvalidToken);
              signOut();
              await signOutAction();
            }
            throw new Error(`${result.statusCode}`);
          }

          setData(result);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError(500);
          }
        } finally {
          setPending(false);
        }
      } else {
        if (!window.localStorage.getItem("sightings")) {
          window.localStorage.setItem("sightings", "[]");
        }
        const data = JSON.parse(
          window.localStorage.getItem("sightings")!,
        ) as SightingWithBirdAndLocation[];

        const sighting = data.find((s) => s.id === sightingId);
        if (!sighting) return setError(404);
        setData(sighting);
      }
    }
    query();
  }, [isSignedIn, sightingId, signOut]);

  if (error) {
    return <ErrorDisplay statusCode={error} />;
  }

  if (!data || pending) {
    return <Pending variant="sightingDetails" />;
  }

  const { bird, birdId, date, description, location } = data;
  return (
    <>
      <section className="flex flex-col gap-4 md:w-[85%] md:gap-10">
        {isSignedIn ? (
          <StaticBirdImage
            bird={bird}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 85vw, 678px"
          />
        ) : (
          <BirdImage
            currBirdName={bird.commonName}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 85vw, 678px"
          />
        )}
        <dl className="my-8 flex flex-col gap-8 px-2 md:gap-12">
          <DescriptionListItem
            dt="Common Name"
            dd={bird.commonName}
            linkHref={`/birds/${birdId}`}
            linkText="View bird"
          />
          <DescriptionListItem
            dt="Date"
            dd={createLocaleString(date, "full")}
            linkHref={`/diary/${convertSightingDateToInteger(date)}`}
            linkText="View diary"
          />
          {isSignedIn && (
            <DescriptionListItem
              dt="Location"
              dd={location && location.name}
              fallbackText="No location provided"
              linkHref={location ? `/locations/${location.id}` : ""}
              linkText="View location"
            />
          )}
          <DescriptionListItem
            dt="Description"
            dd={description}
            fallbackText="No description provided"
          />
        </dl>
        <div className="flex flex-col gap-4 md:gap-6">
          <Button asChild size="lg" variant="secondary">
            <Link href={`/sightings/${sightingId}/edit`}>Edit</Link>
          </Button>
          <Modal
            buttonSize="lg"
            buttonVariant="destructive"
            description="This will permanently delete one of your sightings."
            open={open}
            setOpen={setOpen}
            title="Confirm Delete"
            triggerText="Delete"
          >
            <DeleteItem item={data} setOpen={setOpen} routeTo="/sightings" />
          </Modal>
        </div>
      </section>
    </>
  );
}
