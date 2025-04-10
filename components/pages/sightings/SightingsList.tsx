"use client";

// Renders a list of sighting Cards or ListItems variants
// Fetches sighting data based on provided props
// Renders generic loading, error, error toast components
// All fetched sightings are FetchedSighting type
// Manages list sorting state
// Lists are sorted using generic `SortList` component

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useApi } from "@/context/ApiContext";
import type { FetchedSighting, SortValues, SortOptions } from "@/types/models";
import SightingCard from "@/components/pages/sightings/SightingCard";
import SightingListItem from "@/components/pages/sightings/SightingListItem";
import SortItems from "@/components/pages/SortItems";
import { sortSightings } from "@/helpers/data";

// Discriminated union type based on variant
type SightingsListProps =
  | {
      route: string;
      variant: "card";
      defaultSort: SortValues;
      sortOptions: SortOptions;
      heading: "name" | "date";
    }
  | {
      route: string;
      variant: "list";
      defaultSort?: never;
      sortOptions?: never;
      heading?: never;
    };

export default function SightingsList({
  route,
  variant,
  defaultSort,
  sortOptions,
  heading,
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

  // Sort list
  const [sort, setSort] = useState<SortValues>(defaultSort || "");
  const [sortedList, setSortedList] = useState<FetchedSighting[]>([]);

  // Sort list
  useEffect(() => {
    if (data) {
      const sorted = sortSightings([...data], sort);
      setSortedList(sorted);
    }
  }, [data, sort]);

  if (pending) {
    return <Loader2 />;
  }

  if (error) {
    return <p>An error occurred!</p>;
  }

  if (!sortedList || !sortedList.length) {
    return <p>You have not observed this species.</p>;
  }

  // Renders a <ul> containing sightings
  // Two sighting variants: "list", "card"
  // "list" shows name, date only
  // "card" shows all sighting info
  return (
    <>
      {sortOptions && <SortItems setSort={setSort} options={sortOptions} />}
      <ul className="sighting-list">
        {sortedList.map((sighting) => {
          return variant === "card" ? (
            <SightingCard
              key={sighting.sightingId}
              heading={heading}
              sighting={sighting}
            />
          ) : (
            <SightingListItem key={sighting.sightingId} sighting={sighting} />
          );
        })}
      </ul>
    </>
  );
}
