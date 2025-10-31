import SearchForBird from "@/components/pages/bird/SearchForBird";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import FilterAndResultsText from "@/components/pages/shared/FilterAndResultsText";
import FilterList from "@/components/pages/shared/FilterList";
import ListItem from "@/components/pages/shared/ListItem";
import PaginateList from "@/components/pages/shared/PaginateList";
import SortItems from "@/components/pages/shared/SortItems";
import {
  DETAILS_RESULTS_PER_PAGE,
  RESULTS_PER_PAGE,
} from "@/constants/constants";
import { getCookie } from "@/helpers/auth";
import type {
  ServerResponseWithError,
  ServerResponseWithList,
} from "@/models/api";
import type { ListVariant } from "@/models/display";
import type { SortOptions, SortValues } from "@/models/form";

type ListProps =
  | {
      defaultSortOption: SortValues;
      headingText?: string;
      page: number;
      resource: string;
      sortBy: string;
      sortOptions: SortOptions;
      startsWith?: never;
      variant: Extract<
        ListVariant,
        "lifeList" | "locations" | "locationDetail"
      >;
    }
  | {
      defaultSortOption?: never;
      headingText?: never;
      page: number;
      resource: string;
      sortOptions?: never;
      sortBy?: never;
      startsWith: string | undefined;
      variant: "birds";
    };

/** SSR component that renders a list of items */
export default async function List({
  defaultSortOption,
  headingText,
  page,
  resource,
  sortBy,
  sortOptions,
  startsWith,
  variant,
}: ListProps) {
  const token = await getCookie();

  const requestHeaders: { Authorization?: string } = {};
  if (token) requestHeaders["Authorization"] = `Bearer ${token}`;

  const response = await fetch(resource, { headers: requestHeaders });
  const result: ServerResponseWithList | ServerResponseWithError =
    await response.json();

  if ("error" in result) {
    return <ErrorDisplay statusCode={result.statusCode} />;
  }

  const { countOfRecords, data } = result;
  const noResults = !data.length;
  const records = countOfRecords;
  const pages =
    variant === "locationDetail"
      ? Math.ceil(records / DETAILS_RESULTS_PER_PAGE)
      : Math.ceil(records / RESULTS_PER_PAGE);

  return (
    <>
      <section>
        <div className="min-h-[calc(100vh-600px)]">
          {headingText && <h2 className="mb-10">{headingText}</h2>}
          {variant === "birds" ? (
            <>
              <SearchForBird />
              <FilterList startsWith={startsWith} noResults={noResults} />
            </>
          ) : (
            <SortItems
              defaultSortOption={defaultSortOption}
              options={sortOptions}
              isSSR
              noResults={noResults}
            />
          )}
          <FilterAndResultsText
            variant={variant}
            startsWith={startsWith}
            records={result.countOfRecords}
            page={+page!}
            noResults={noResults}
          />
          <ul className="my-8 divide-y">
            {!data.length ? (
              <>
                <p className="px-2 italic">No results found.</p>
              </>
            ) : (
              data.map((item) => {
                return <ListItem key={item.id} variant={variant} item={item} />;
              })
            )}
          </ul>
        </div>
        <PaginateList
          currentPage={page}
          finalPage={pages}
          startsWith={startsWith}
          sortBy={sortBy}
        />
      </section>
    </>
  );
}
