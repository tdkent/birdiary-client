"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useApi } from "@/context/ApiContext";
import type { Sighting } from "@/types/models";
import SightingListItem from "@/components/pages/SightingListItem";

/*
 * Renders a list of the user's recent bird sightings.
 * Query method is determined by the user's auth status.
 * If signed out, query "sightings" key from browser storage.
 * If signed in, send query to web server.
 * The sightings array is mapped to render sighting cards.
 */

export default function SightingsList() {
  const { toast } = useToast();
  const { useQuery } = useApi();
  const { data, error, pending } = useQuery<Sighting>({
    route: "/sightings/recent",
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
    return <p>No recent sightings to show!</p>;
  }

  return (
    <ul className="sighting-list">
      {data.map((sighting) => {
        return (
          <SightingListItem key={sighting.sightingId} sighting={sighting} />
        );
      })}
    </ul>
  );
}
