"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/context/ApiContext";
import type { RecentSighting } from "@/types/models";

/*
 * Renders a list of the user's recent bird sightings.
 * Query method is determined by the user's auth status.
 * If signed out, query "sightings" key from browser storage.
 * If signed in, send query to web server.
 * The sightings array is mapped to render sighting cards.
 */

export default function SightingList() {
  const { toast } = useToast();
  const { useQuery } = useApi();
  const { data, error, pending } = useQuery<RecentSighting>({
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

  return (
    <section>
      <h2>Recent Sightings</h2>
      {pending ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((sighting) => {
            return <li key={sighting.id}>{sighting.commName}</li>;
          })}
        </ul>
      )}
    </section>
  );
}
