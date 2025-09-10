"use client";

import { useApi } from "@/context/ApiContext";
import type { SortOptions, SortValues } from "@/models/form";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import Pending from "@/components/pages/shared/Pending";
import NoResultsDisplay from "@/components/pages/shared/NoResultsDisplay";
import CsrListItem from "@/components/pages/shared/CsrListItem";
import SortItems from "@/components/pages/shared/SortItems";
import FilterAndResultsText from "@/components/pages/shared/FilterAndResultsText";
import PaginateList from "@/components/pages/shared/PaginateList";
import { RESULTS_PER_PAGE } from "@/constants/constants";

type CsrListProps =
  | {
      defaultSortOption: SortValues;
      headingText?: never;
      page: number;
      pendingVariant: "card" | "listSingleRow" | "listDoubleRow";
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
      pendingVariant: "card" | "listSingleRow" | "listDoubleRow";
      route: string;
      page: number;
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

  const noResults = !items.length;
  const currentPage = page;
  const pages = Math.ceil(count / RESULTS_PER_PAGE);

  return (
    <>
      <section>
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
          <Pending variant={pendingVariant} listSize={RESULTS_PER_PAGE} />
        ) : !items.length ? (
          <NoResultsDisplay />
        ) : (
          <ul
            className={`my-8 ${["diary", "sighting"].includes(variant) && "divide-y"} ${["birdDetail", "diaryDetail"].includes(variant) && "flex flex-col gap-4 md:flex-row md:flex-wrap"}`}
          >
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
      </section>
    </>
  );
}
