"use client";

import CsrListItem from "@/components/pages/shared/CsrListItem";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import FilterAndResultsText from "@/components/pages/shared/FilterAndResultsText";
import NoResultsDisplay from "@/components/pages/shared/NoResultsDisplay";
import PaginateList from "@/components/pages/shared/PaginateList";
import Pending from "@/components/pages/shared/Pending";
import SortItems from "@/components/pages/shared/SortItems";
import { PAGINATE } from "@/constants/app.constants";
import { useApi } from "@/context/ApiContext";
import type { Tags } from "@/types/api.types";
import type { SortOptions, SortValues } from "@/types/list-sort.types";

type CsrListProps = {
  defaultSortOption: SortValues;
  favBirdId?: number | null;
  headingText?: string;
  page: number;
  pendingVariant: "list";
  route: string;
  sortBy: string;
  sortOptions: SortOptions;
  variant: "birdDetail" | "diary" | "diaryDetail" | "sighting";
};

/** CSR component that renders a list of items */
export default function CsrList({
  defaultSortOption,
  favBirdId,
  headingText,
  page,
  pendingVariant,
  route,
  sortBy,
  sortOptions,
  variant,
}: CsrListProps) {
  const { useQuery } = useApi();

  const tags: Tags[] =
    variant === "diaryDetail" ? ["location", "sighting"] : ["sighting"];

  const { count, data, error, pending } = useQuery({
    route,
    tags,
    variant,
  });

  const items = data as unknown[];

  if (error) {
    return <ErrorDisplay msg={error} />;
  }

  const detailVariants: (typeof variant)[] = ["diaryDetail", "birdDetail"];

  const currentPage = page;
  const pages = detailVariants.includes(variant)
    ? Math.ceil(count / PAGINATE.SMALL_LIST)
    : Math.ceil(count / PAGINATE.LARGE_LIST);
  const listSize = detailVariants.includes(variant)
    ? PAGINATE.SMALL_LIST
    : PAGINATE.LARGE_LIST;

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
            hasCount={!!count}
          />
          <FilterAndResultsText
            variant={variant}
            records={count}
            page={+page!}
            hasCount={!!count}
          />
          {pending || !items ? (
            <Pending variant={pendingVariant} listSize={listSize} />
          ) : !items.length ? (
            <NoResultsDisplay />
          ) : (
            <ul className="my-8 divide-y">
              {items.map((item, idx) => {
                return (
                  <CsrListItem
                    favBirdId={favBirdId}
                    item={item}
                    key={idx}
                    variant={variant}
                  />
                );
              })}
            </ul>
          )}
        </div>
        {count > 0 && (
          <PaginateList
            currentPage={currentPage}
            finalPage={pages}
            sortBy={sortBy}
          />
        )}
      </section>
    </>
  );
}
