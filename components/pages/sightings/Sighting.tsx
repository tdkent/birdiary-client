"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  apiRoutes,
  Messages,
  ServerResponseWithError,
  ServerResponseWithObject,
} from "@/models/api";
import type { SightingWithLocation } from "@/models/display";
import { getCookie } from "@/helpers/auth";

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

  if (pending) {
    return <p>Loading...</p>;
  }

  const sighting = data as SightingWithLocation;
  return (
    <>
      <section>{/* <BirdImage bird={sighting.bird} /> */}</section>
    </>
  );
}
