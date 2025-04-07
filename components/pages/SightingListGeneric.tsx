"use client";

// Fetches sighting data based on provided props
// key and tag should always be "sightings"
// Renders generic loading, error, error toast components
// Passes fetched sighting data to SightingCard generic component
//! All fetched sightings should be of the same type!

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useApi } from "@/context/ApiContext";
import type { FetchedSighting } from "@/types/models";
import SightingCard from "@/components/pages/SightingCard";

/*
 * Renders a list of the user's recent bird sightings.
 * Query method is determined by the user's auth status.
 * If signed out, query "sightings" key from browser storage.
 * If signed in, send query to web server.
 * The sightings array is mapped to render sighting cards.
 */

type SightingsListProps = {
  route: string;
  heading: "name" | "date";
};

export default function SightingsList({ route, heading }: SightingsListProps) {
  const { toast } = useToast();
  const { useQuery } = useApi();
  const { data, error, pending } = useQuery<FetchedSighting>({
    route,
    key: "sightings",
    tag: "sightings",
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

  if (pending) {
    return <Loader2 />;
  }

  if (error) {
    return <p>An error occurred!</p>;
  }

  if (!data || !data.length) {
    return <p>You have not observed this species.</p>;
  }

  return (
    <>
      <ul className="sighting-list">
        {data.map((sighting) => {
          return (
            <SightingCard
              key={sighting.sightingId}
              heading={heading}
              sighting={sighting}
            />
          );
        })}
      </ul>
    </>
  );
}
