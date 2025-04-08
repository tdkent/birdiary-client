"use client";

// Renders a list of the user's recent bird sightings.
// Fetches sighting data based on provided props
// key and tag should always be "sightings"
// Renders generic loading, error, error toast components
// Passes fetched sighting data to generic card or list
// components based on `variant` prop.
// Use FetchedSighting type for all sightings

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useApi } from "@/context/ApiContext";
import type { FetchedSighting } from "@/types/models";
import SightingCard from "@/components/pages/sightings/SightingCard";

// Discriminated union type requires `heading` when variant = "card"
type SightingsListProps =
  | { route: string; variant: "card"; heading: "name" | "date" }
  | { route: string; variant: "list"; heading?: never };

export default function SightingsList({
  route,
  heading,
  variant,
}: SightingsListProps) {
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

  // Renders a <ul> containing sightings
  // Two sighting variants: "list", "card"
  // "list" shows name, date only
  // "card" shows all sighting info
  return (
    <>
      <ul className="sighting-list">
        {data.map((sighting) => {
          return variant === "card" ? (
            <SightingCard
              key={sighting.sightingId}
              heading={heading}
              sighting={sighting}
            />
          ) : (
            <p>list</p>
          );
        })}
      </ul>
    </>
  );
}
