"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/context/ApiContext";
import type { SortOptions, SortValues } from "@/models/form";
import Pending from "@/components/pages/shared/Pending";
import CsrListItem from "@/components/pages/shared/CsrListItem";
import SortItems from "@/components/pages/shared/SortItems";
import FilterAndResultsText from "@/components/pages/shared/FilterAndResultsText";
import PaginateList from "@/components/pages/shared/PaginateList";
import { RESULTS_PER_PAGE } from "@/constants/constants";

type CsrListProps =
  | {
      variant: "diary";
      route: string;
      tag: "diary";
      page: number;
      sortBy: string;
      defaultSortOption: SortValues;
      sortOptions: SortOptions;
      startsWith?: never;
    }
  | {
      variant: "sighting" | "diaryDetail" | "birdDetail";
      route: string;
      tag: "sightings";
      page: number;
      sortBy: string;
      defaultSortOption: SortValues;
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
  defaultSortOption,
  sortOptions,
  startsWith,
}: CsrListProps) {
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

  if (pending || !items)
    return <Pending variant="list" listSize={RESULTS_PER_PAGE} />;

  if (error) {
    return <p>An error occurred!</p>;
  }

  if (!items.length) {
    switch (variant) {
      case "sighting":
        return <p>You haven&apos;t added any sightings!</p>;

      case "diary":
        return <p>No diary entries yet. Add some sightings!</p>;

      case "birdDetail":
        return <p>You have not observed this bird yet!</p>;

      default:
        return <p>Nothing to show!</p>;
    }
  }

  const currentPage = page;
  const pages = Math.ceil(count / RESULTS_PER_PAGE);

  return (
    <>
      <SortItems
        defaultSortOption={defaultSortOption}
        options={sortOptions}
        isSSR
      />
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
