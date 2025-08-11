"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { AuthContext } from "@/context/AuthContext";
import {
  apiRoutes,
  Messages,
  ServerResponseWithError,
  ServerResponseWithObject,
} from "@/models/api";
import type { SightingInStorage, SightingWithLocation } from "@/models/display";
import BirdImage from "@/components/forms/BirdImage";
import { createLocaleString } from "@/helpers/dates";

type SightingProps = {
  sightingId: number;
};

/** Fetch and display sighting data. */
export default function Sighting({ sightingId }: SightingProps) {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState<
    SightingWithLocation | SightingInStorage | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const { toast } = useToast();
  const route = apiRoutes.sighting(sightingId);

  useEffect(() => {
    async function query() {
      setError(null);
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
        ) as SightingInStorage[];
        const sighting = data.find((s) => s.id === sightingId);
        if (!sighting) return setError("Resource not found");
        setData(sighting);
      }
    }
    query();
  }, [route, sightingId, token]);

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
        <p>An error occurred!</p>
        <p>{error}</p>
      </>
    );
  }

  if (!data || pending) {
    return <p>Loading...</p>;
  }

  if (!token) {
    const { bird, date, description } = data as SightingInStorage;
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
