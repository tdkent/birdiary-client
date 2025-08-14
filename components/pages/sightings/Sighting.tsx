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
import { formatBirdNameToUrl } from "@/helpers/data";

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

          if ("error" in result) {
            const error = result as ServerResponseWithError;
            const msg = Array.isArray(error.message)
              ? error.message.join(",")
              : error.message;
            throw new Error(`${error.error}: ${msg}`);
          }

          const sighting = result as SightingWithLocation;
          setData(sighting);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError(Messages.DefaultError);
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
        <ErrorDisplay msg={error} />
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
      <section>
        <BirdImage currBirdName={bird.commonName} />
        <dl className="my-8 flex flex-col gap-6">
          <div>
            <dt className="text-xs font-semibold uppercase">Species</dt>
            <dd className="">{bird.commonName}</dd>
            <Link
              href={`/birds/${formatBirdNameToUrl(bird.commonName)}`}
              className="text-sm italic hover:underline"
            >
              View bird
            </Link>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase">Date</dt>
            <dd className="">{createLocaleString(date, "full")}</dd>
            <Link
              href={`/diary/${date.slice(0, 10)}`}
              className="text-sm italic hover:underline"
            >
              View diary
            </Link>
          </div>
          {isSignedIn && (
            <>
              <div>
                <dt className="text-xs font-semibold uppercase">Location</dt>
                {location ? (
                  <>
                    <dd>{location.name}</dd>
                    <Link
                      href={`/locations/${location.id} ${location.name}`}
                      className="text-sm italic hover:underline"
                    >
                      View location
                    </Link>
                  </>
                ) : (
                  <>
                    <dd className="italic">No location provided</dd>
                  </>
                )}
              </div>
            </>
          )}
          <div>
            <dt className="text-xs font-semibold uppercase">Description</dt>
            {description ? (
              <>
                <dd>{description}</dd>
              </>
            ) : (
              <>
                <dd className="italic">No description provided</dd>
              </>
            )}
          </div>
        </dl>
        <div className="flex flex-col gap-4">
          <Button asChild className="w-full" size="lg" variant="secondary">
            <Link href={`/sightings/${sightingId}/edit`}>Edit</Link>
          </Button>
          <Modal
            buttonSize="lg"
            buttonStyles="w-full"
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
