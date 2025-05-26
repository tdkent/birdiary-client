"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useApi } from "@/context/ApiContext";
// import type { Diary, SortValues, SortOptions, Sighting } from "@/types/models";
import type { QueryParameters } from "@/types/api";
import CsrListItem from "@/components/pages/shared/CsrListItem";
// import SightingCard from "@/components/pages/shared/SightingCard";
// import SightingListItem from "@/components/pages/shared/SightingListItem";
// import SortItems from "@/components/pages/shared/SortItems";
// import { sortSightings } from "@/helpers/data";

// Discriminated union type based on variant
type SightingsListProps =
  | {
      variant: "diary";
      route: QueryParameters["route"];
      tag: "diary";
      // defaultSort: SortValues;
      // sortOptions: SortOptions;
    }
  | {
      variant: "recentSighting" | "diaryDetail" | "birdDetail";
      route: QueryParameters["route"];
      tag: "sightings";
      // defaultSort?: never;
      // sortOptions?: never;
    };

/** CSR component that renders a list of items */
export default function CsrList({
  route,
  variant,
  tag,
  // defaultSort,
  // sortOptions,
  // heading,
}: SightingsListProps) {
  const { toast } = useToast();
  const { useQuery } = useApi();
  const {
    data: items,
    error,
    pending,
  } = useQuery({
    route,
    tag,
    variant,
  });

  console.log(items);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: error,
      });
    }
  }, [error, toast]);

  // const [sort, setSort] = useState<SortValues>(defaultSort || "");
  // const [sortedList, setSortedList] = useState<Diary[] | Sighting[]>([]);

  // useEffect(() => {
  //   if (data) {
  //     const sorted = sortSightings([...data], sort);
  //     setSortedList(sorted);
  //   }
  // }, [data, sort]);

  if (pending || !items) {
    return <Loader2 />;
  }

  if (error) {
    return <p>An error occurred!</p>;
  }

  if (!items.length) {
    switch (variant) {
      case "recentSighting":
        return <p>You haven&apos;t added any sightings!</p>;

      case "diary":
        return <p>No diary entries yet. Add some sightings!</p>;

      case "birdDetail":
        return <p>You have not observed this bird yet!</p>;

      default:
        return <p>Nothing to show!</p>;
    }
  }

  return (
    <>
      {/* {sortOptions && <SortItems setSort={setSort} options={sortOptions} />} */}
      {/* <ul className="sighting-list">
        {data.map((sighting) => {
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
      </ul> */}
      <ul className="my-4">
        {items.map((item, idx) => {
          return <CsrListItem key={idx} variant={variant} item={item} />;
        })}
      </ul>
    </>
  );
}
