"use client";

import CsrListItem from "@/components/pages/shared/CsrListItem";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import FilterAndResultsText from "@/components/pages/shared/FilterAndResultsText";
import NoResultsDisplay from "@/components/pages/shared/NoResultsDisplay";
import PaginateList from "@/components/pages/shared/PaginateList";
import Pending from "@/components/pages/shared/Pending";
import SortItems from "@/components/pages/shared/SortItems";
import {
  DETAILS_RESULTS_PER_PAGE,
  RESULTS_PER_PAGE,
} from "@/constants/constants";
import { useApi } from "@/context/ApiContext";
import type { SortOptions, SortValues } from "@/models/form";

type CsrListProps =
  | {
      defaultSortOption: SortValues;
      headingText?: never;
      page: number;
      pendingVariant: "list";
      route: string;
      sortBy: string;
      sortOptions: SortOptions;
      startsWith?: never;
      tag: "diary";
      variant: "diary";
    }
  | {
      defaultSortOption: SortValues;
      headingText?: string;
      page: number;
      pendingVariant: "list";
      route: string;
      sortBy: string;
      sortOptions: SortOptions;
      startsWith?: never;
      tag: "sightings";
      variant: "sighting" | "diaryDetail" | "birdDetail";
    };

/** CSR component that renders a list of items */
export default function CsrList({
  defaultSortOption,
  headingText,
  page,
  pendingVariant,
  route,
  sortBy,
  sortOptions,
  startsWith,
  tag,
  variant,
}: CsrListProps) {
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

  if (error) {
    return <ErrorDisplay statusCode={error} />;
  }

  const detailVariants: (typeof variant)[] = ["diaryDetail", "birdDetail"];

  const noResults = !items.length;
  const currentPage = page;
  const pages = detailVariants.includes(variant)
    ? Math.ceil(count / DETAILS_RESULTS_PER_PAGE)
    : Math.ceil(count / RESULTS_PER_PAGE);
  const listSize = detailVariants.includes(variant)
    ? DETAILS_RESULTS_PER_PAGE
    : RESULTS_PER_PAGE;

  return (
    <>
      <section>
        <div className="min-h-[calc(100vh-600px)]">
          {headingText && <h2 className="mb-10">{headingText}</h2>}
          <SortItems
            defaultSortOption={defaultSortOption}
            options={sortOptions}
            pending={pending}
            count={count}
            noResults={noResults}
          />
          <FilterAndResultsText
            variant={variant}
            startsWith={startsWith}
            records={count}
            page={+page!}
            noResults={noResults}
          />
          {pending || !items ? (
            <Pending variant={pendingVariant} listSize={listSize} />
          ) : !items.length ? (
            <NoResultsDisplay />
          ) : (
            <ul className="my-8 divide-y">
              {items.map((item, idx) => {
                return <CsrListItem key={idx} variant={variant} item={item} />;
              })}
            </ul>
          )}
        </div>
        {count > 0 && (
          <PaginateList
            currentPage={currentPage}
            finalPage={pages}
            sortBy={sortBy}
            startsWith={startsWith}
          />
        )}
      </section>
    </>
  );
}
