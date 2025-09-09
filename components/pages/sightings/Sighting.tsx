"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import {
  apiRoutes,
  Messages,
  ServerResponseWithError,
  ServerResponseWithObject,
} from "@/models/api";
import type { SightingWithLocation } from "@/models/display";
import { createLocaleString } from "@/helpers/dates";
import BirdImage from "@/components/forms/BirdImage";
import DeleteItem from "@/components/pages/shared/DeleteItem";
import Modal from "@/components/ui/Modal";
import { getCookie } from "@/helpers/auth";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import Pending from "@/components/pages/shared/Pending";
import { convertSightingDateToInteger } from "@/helpers/dates";

type SightingProps = {
  sightingId: number;
};

/** Fetch and display sighting data. */
export default function Sighting({ sightingId }: SightingProps) {
  const { isSignedIn } = useContext(AuthContext);
  const [data, setData] = useState<SightingWithLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();
  const route = apiRoutes.sighting(sightingId);

  useEffect(() => {
    async function query() {
      setError(null);
      const token = await getCookie();
      if (token) {
        setPending(true);
        try {
          const response = await fetch(route, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const result: ServerResponseWithObject | ServerResponseWithError =
            await response.json();

          console.log(result);

          if ("error" in result) {
            const error = result as ServerResponseWithError;
            throw new Error(`${error.statusCode}`);
          }

          const sighting = result as SightingWithLocation;
          setData(sighting);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError(Messages.UnknownUnexpectedError);
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
        if (!sighting) return setError("Resource not found");
        setData(sighting);
      }
    }
    query();
  }, [route, sightingId]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: Messages.ToastErrorTitle,
        description: error,
      });
    }
  }, [error, toast]);

  if (error) {
    return (
      <>
        <ErrorDisplay />
      </>
    );
  }

  if (!data || pending) {
    return (
      <>
        <Pending variant="sighting" />
      </>
    );
  }

  const { bird, date, description, location } = data;
  return (
    <>
      <section className="flex flex-col gap-4 md:w-[85%] md:gap-10">
        <BirdImage currBirdName={bird.commonName} />
        <dl className="my-8 flex flex-col gap-8 px-2 md:gap-12">
          <div className="flex flex-col gap-1">
            <dt className="text-sm font-semibold uppercase md:text-base">
              Common Name
            </dt>
            <dd className="text-xl md:text-2xl">{bird.commonName}</dd>
            <Link
              href={`/birds/${bird.id}`}
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
                    <dd className="text-xl md:text-2xl">{location.name}</dd>
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
                <dd className="text-xl md:text-2xl">{description}</dd>
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
