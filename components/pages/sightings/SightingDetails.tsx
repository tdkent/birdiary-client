"use client";

import { signOut as signOutAction } from "@/actions/auth";
import { getSighting } from "@/actions/sighting";
import BirdImage from "@/components/forms/BirdImage";
import StaticBirdImage from "@/components/image/StaticBirdImage";
import DeleteItem from "@/components/pages/shared/DeleteItem";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import Pending from "@/components/pages/shared/Pending";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/context/AuthContext";
import { checkSession } from "@/helpers/auth";
import {
  convertSightingDateToInteger,
  createLocaleString,
} from "@/helpers/dates";
import { useToast } from "@/hooks/use-toast";
import { Messages } from "@/models/api";
import type { SightingWithLocation } from "@/models/display";
import Link from "next/link";
import { useEffect, useState } from "react";

type SightingProps = {
  sightingId: number;
};

/** Fetch and display sighting data. */
export default function SightingDetails({ sightingId }: SightingProps) {
  const { isSignedIn } = useAuth();
  const [data, setData] = useState<SightingWithLocation | null>(null);
  const [error, setError] = useState<number | string | null>(null);
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const { signOut } = useAuth();

  useEffect(() => {
    async function query() {
      setError(null);
      const hasSession = await checkSession();
      if (hasSession) {
        setPending(true);
        try {
          const result = await getSighting(sightingId);

          if ("error" in result) {
            if (result.statusCode === 401) {
              toast({
                variant: "destructive",
                description: Messages.InvalidToken,
              });
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
        ) as SightingWithLocation[];
        const sighting = data.find((s) => s.id === sightingId);
        if (!sighting) return setError(404);
        setData(sighting);
      }
    }
    query();
  }, [sightingId, signOut, toast]);

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
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Common Name
            </dt>
            <dd className="text-xl md:text-2xl">{bird.commonName}</dd>
            <Link
              href={`/birds/${birdId}`}
              className="link-inline text-lg md:text-xl"
            >
              View bird
            </Link>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Date
            </dt>
            <dd className="text-xl md:text-2xl">
              {createLocaleString(date, "full")}
            </dd>
            <Link
              href={`/diary/${convertSightingDateToInteger(date)}`}
              className="link-inline text-lg md:text-xl"
            >
              View diary
            </Link>
          </div>
          {isSignedIn && (
            <>
              <div className="flex flex-col gap-1">
                <dt className="text-sm font-semibold uppercase md:text-base">
                  Location
                </dt>
                {location ? (
                  <>
                    <dd className="break-words text-xl md:text-2xl">
                      {location.name}
                    </dd>
                    <Link
                      href={`/locations/${location.id}`}
                      className="link-inline text-lg md:text-xl"
                    >
                      View location
                    </Link>
                  </>
                ) : (
                  <>
                    <dd className="text-lg italic md:text-xl">
                      No location provided
                    </dd>
                  </>
                )}
              </div>
            </>
          )}
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Description
            </dt>
            {description ? (
              <>
                <dd className="break-words text-xl md:text-2xl">
                  {description}
                </dd>
              </>
            ) : (
              <>
                <dd className="text-lg italic md:text-xl">
                  No description provided
                </dd>
              </>
            )}
          </div>
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
