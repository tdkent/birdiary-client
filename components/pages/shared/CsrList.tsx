"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/context/ApiContext";
import type { SortOptions, SortValues } from "@/models/form";
import Pending from "@/components/pages/shared/Pending";
import NoResultsDisplay from "@/components/pages/shared/NoResultsDisplay";
import CsrListItem from "@/components/pages/shared/CsrListItem";
import SortItems from "@/components/pages/shared/SortItems";
import FilterAndResultsText from "@/components/pages/shared/FilterAndResultsText";
import PaginateList from "@/components/pages/shared/PaginateList";
import { RESULTS_PER_PAGE } from "@/constants/constants";

type CsrListProps =
  | {
      variant: "diary";
      pendingVariant: "card" | "listSingleRow" | "listDoubleRow";
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
      pendingVariant: "card" | "listSingleRow" | "listDoubleRow";
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
  pendingVariant,
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

  if (error) {
    return <p>An error occurred!</p>;
  }

  const currentPage = page;
  const pages = Math.ceil(count / RESULTS_PER_PAGE);

  return (
    <>
      <SortItems
        defaultSortOption={defaultSortOption}
        options={sortOptions}
        pending={pending}
        count={count}
      />
      <FilterAndResultsText
        variant={variant}
        startsWith={startsWith}
        records={count}
        page={+page!}
      />
      {pending || !items ? (
        <Pending variant={pendingVariant} listSize={RESULTS_PER_PAGE} />
      ) : !items.length ? (
        <NoResultsDisplay variant={variant} />
      ) : (
        <ul className="my-4">
          {items.map((item, idx) => {
            return <CsrListItem key={idx} variant={variant} item={item} />;
          })}
        </ul>
      )}
      {count > 0 && (
        <PaginateList
          currentPage={currentPage}
          finalPage={pages}
          sortBy={sortBy}
          startsWith={startsWith}
        />
      )}
    </>
  );
}
