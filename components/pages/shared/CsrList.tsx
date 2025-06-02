"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useApi } from "@/context/ApiContext";
import type { SortOptions, SortValues } from "@/types/models";
import type { QueryParameters } from "@/types/api";
import CsrListItem from "@/components/pages/shared/CsrListItem";
import SortItems from "@/components/pages/shared/SortItems";
import FilterAndResultsText from "@/components/pages/shared/FilterAndResultsText";
import PaginateList from "@/components/pages/shared/PaginateList";
import { RESULTS_PER_PAGE } from "@/constants/constants";

// Discriminated union type based on variant
type SightingsListProps =
  | {
      variant: "diary";
      route: QueryParameters["route"];
      tag: "diary";
      page: string;
      sortBy: string;
      defaultOption: SortValues;
      sortOptions: SortOptions;
      startsWith?: never;
    }
  | {
      variant: "recentSighting" | "diaryDetail" | "birdDetail";
      route: QueryParameters["route"];
      tag: "sightings";
      page: string;
      sortBy: string;
      defaultOption: SortValues;
      sortOptions: SortOptions;
      startsWith?: never;
    };

/** CSR component that renders a list of items */
export default function CsrList({
  route,
  variant,
  tag,
  page,
  sortBy,
  defaultOption,
  sortOptions,
  startsWith,
}: SightingsListProps) {
  const { toast } = useToast();
  const { useQuery } = useApi();
  const {
    count,
    data: items,
    error,
    pending,
  } = useQuery({
    route,
    tag,
    variant,
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

  if (variant === "recentSighting") {
    return (
      <>
        <ul className="my-4">
          {items.map((item, idx) => {
            return <CsrListItem key={idx} variant={variant} item={item} />;
          })}
        </ul>
      </>
    );
  }

  const currentPage = +page;
  const pages = Math.ceil(count / RESULTS_PER_PAGE);

  return (
    <>
      <SortItems defaultOption={defaultOption} options={sortOptions} isSSR />
      <FilterAndResultsText
        variant={variant}
        startsWith={startsWith}
        records={count}
        page={+page!}
      />
      <ul className="my-4">
        {items.map((item, idx) => {
          return <CsrListItem key={idx} variant={variant} item={item} />;
        })}
      </ul>
      <PaginateList
        currentPage={currentPage}
        finalPage={pages}
        sortBy={sortBy}
        startsWith={startsWith}
      />
    </>
  );
}
