"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  apiRoutes,
  Messages,
  ServerResponseWithError,
  ServerResponseWithObject,
} from "@/models/api";
import type { SightingWithLocation } from "@/models/display";
import { getCookie } from "@/helpers/auth";
import BirdImage from "@/components/forms/BirdImage";
import { createLocaleString } from "@/helpers/dates";

type SightingProps = {
  sightingId: number;
};

/** Fetch and display sighting data. */
export default function Sighting({ sightingId }: SightingProps) {
  const [data, setData] = useState<SightingWithLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    async function query() {
      setError(null);
      const token = await getCookie();
      if (token) {
        setPending(true);
        try {
          const response = await fetch(apiRoutes.sighting(sightingId), {
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
        // const { items, countOfRecords } = queryStorage(route, tag);
        // setData((items as SightingInStorage[] | Group[]) || []);
        // setCount(countOfRecords);
      }
    }
    query();
  }, [sightingId]);

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
    return <p>An error occurred!</p>;
  }

  if (!data || pending) {
    return <p>Loading...</p>;
  }

  const { bird, date, description, location } = data as SightingWithLocation;
  return (
    <>
      <section>
        <BirdImage currBirdName={bird.commonName} />
        <h2>{bird.commonName}</h2>
        <dl className="my-8 flex flex-col gap-6">
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
      </section>
    </>
  );
}
