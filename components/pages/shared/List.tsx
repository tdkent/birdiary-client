import SearchForBird from "@/components/pages/bird/SearchForBird";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import FilterAndResultsText from "@/components/pages/shared/FilterAndResultsText";
import FilterList from "@/components/pages/shared/FilterList";
import ListItem from "@/components/pages/shared/ListItem";
import PaginateList from "@/components/pages/shared/PaginateList";
import SortItems from "@/components/pages/shared/SortItems";
import { PAGINATE } from "@/constants/app.constants";
import { getCookie } from "@/helpers/auth";
import type { ApiResponse, Identifiable } from "@/types/api.types";
import type {
  ListVariant,
  SortOptions,
  SortValues,
} from "@/types/list-sort.types";

type ListProps =
  | {
      defaultSortOption: SortValues;
      favBirdId?: number | null;
      headingText?: string;
      page: number;
      resource: string;
      search?: never;
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
      favBirdId?: number | null;
      headingText?: never;
      page: number;
      resource: string;
      search: string | undefined;
      sortOptions?: never;
      sortBy?: never;
      startsWith: string | undefined;
      variant: "birds";
    };

/** SSR component that renders a list of items */
export default async function List({
  defaultSortOption,
  favBirdId,
  headingText,
  page,
  resource,
  search,
  sortBy,
  sortOptions,
  startsWith,
  variant,
}: ListProps) {
  const token = await getCookie();

  const requestHeaders: { Authorization?: string } = {};
  if (token) requestHeaders["Authorization"] = `Bearer ${token}`;

  const response = await fetch(resource, { headers: requestHeaders });
  const result: ApiResponse<Identifiable[]> = await response.json();

  if (result.error) {
    return <ErrorDisplay msg={result.message} />;
  }

  const { count, data } = result;

  const pages =
    variant === "locationDetail"
      ? Math.ceil(count / PAGINATE.SMALL_LIST)
      : Math.ceil(count / PAGINATE.LARGE_LIST);

  return (
    <>
      <section>
        <div className="min-h-[calc(100vh-600px)]">
          {headingText && <h2 className="mb-10">{headingText}</h2>}
          {variant === "birds" ? (
            <div className="flex gap-4 max-lg:flex-col lg:mb-10 lg:items-start">
              <SearchForBird />
              <FilterList startsWith={startsWith} />
            </div>
          ) : (
            <SortItems
              defaultSortOption={defaultSortOption}
              options={sortOptions}
              isSSR
              hasCount={!!count}
            />
          )}
          <FilterAndResultsText
            variant={variant}
            search={search}
            startsWith={startsWith}
            records={count}
            page={+page!}
            hasCount={!!count}
          />
          <ul className="my-8 divide-y">
            {!data.length ? (
              <>
                <p className="px-2 italic">No results found.</p>
              </>
            ) : (
              data.map((item) => {
                return (
                  <ListItem
                    favBirdId={favBirdId}
                    item={item}
                    key={item.id}
                    searchTerm={search}
                    variant={variant}
                  />
                );
              })
            )}
          </ul>
        </div>
        <PaginateList
          currentPage={page}
          finalPage={pages}
          search={search}
          startsWith={startsWith}
          sortBy={sortBy}
        />
      </section>
    </>
  );
}
