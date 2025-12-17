"use client";

import { signOut as signOutAction } from "@/actions/auth";
import { getSighting } from "@/actions/sighting";
import BirdImage from "@/components/forms/BirdImage";
import StaticBirdImage from "@/components/image/StaticBirdImage";
import DeleteItem from "@/components/pages/shared/DeleteItem";
import DescriptionListItem from "@/components/pages/shared/DescriptionListItem";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import Pending from "@/components/pages/shared/Pending";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";
import { getUserProfileOrNull } from "@/helpers/auth";
import {
  convertSightingDateToInteger,
  createLocaleString,
} from "@/helpers/dates";
import { Messages } from "@/models/api";
import type { SightingWithBirdAndLocation } from "@/models/display";
import { CircleCheck, Heart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type SightingProps = {
  sightingId: number;
};

/** Fetch and display sighting data. */
export default function SightingDetails({ sightingId }: SightingProps) {
  const { isSignedIn, signOut } = useAuth();

  const [sighting, setSighting] = useState<SightingWithBirdAndLocation | null>(
    null,
  );
  const [favBirdId, setFavBirdId] = useState<number | null>(null);
  const [error, setError] = useState<string | string | null>(null);
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function query() {
      setError(null);
      if (isSignedIn) {
        setPending(true);
        try {
          const sighting = await getSighting(sightingId);

          if ("error" in sighting) {
            if (sighting.statusCode === 401) {
              toast.error(Messages.InvalidToken);
              signOut();
              await signOutAction();
            }
            return setError(sighting.message);
          }

          const user = await getUserProfileOrNull();

          setSighting(sighting);
          if (user) setFavBirdId(user?.favoriteBirdId);
        } catch (error) {
          console.error(error);
          setError(Messages.UnknownUnexpectedError);
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
        if (!sighting) return setError(Messages.NotFoundError);
        setSighting(sighting);
      }
    }
    query();
  }, [isSignedIn, sightingId, signOut]);

  if (error) {
    return <ErrorDisplay msg={error} />;
  }

  if (!sighting || pending) {
    return <Pending variant="sightingDetails" />;
  }

  const { bird, birdId, date, description, isNew, location } = sighting;

  const isFavBird = birdId === favBirdId;

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
        {(isNew || isFavBird) && (
          <div className="mt-4 flex gap-2">
            {isNew && (
              <Badge className="w-fit px-3 text-sm" variant="lifeList">
                <CircleCheck size={16} strokeWidth={1.5} />
                Life List
              </Badge>
            )}
            {isFavBird && (
              <Badge className="w-fit px-3 text-sm" variant="favorite">
                <Heart
                  className="fill-fuchsia-400 text-fuchsia-300"
                  strokeWidth={1.5}
                  size={16}
                />
                Fav Bird
              </Badge>
            )}
          </div>
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
            <DeleteItem
              item={sighting}
              setOpen={setOpen}
              routeTo="/sightings"
            />
          </Modal>
        </div>
      </section>
    </>
  );
}
