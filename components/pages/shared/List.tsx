import { getCookie } from "@/helpers/auth";
import type { ExpectedServerError, QuerySuccess } from "@/models/api";
import type { ListVariant, ListWithCount } from "@/models/display";
import type { SortOptions, SortValues } from "@/models/form";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import SortItems from "@/components/pages/shared/SortItems";
import FilterList from "@/components/pages/shared/FilterList";
import FilterAndResultsText from "@/components/pages/shared/FilterAndResultsText";
import ListItem from "@/components/pages/shared/ListItem";
import PaginateList from "@/components/pages/shared/PaginateList";
import { RESULTS_PER_PAGE } from "@/constants/constants";

// TODO: search input

type ListProps =
  | {
      variant: Extract<
        ListVariant,
        "lifelistSighting" | "location" | "locationDetail"
      >;
      page: string;
      sortBy: string;
      resource: string;
      defaultOption: SortValues;
      sortOptions: SortOptions;
      startsWith?: never;
    }
  | {
      variant: Extract<ListVariant, "birdpedia">;
      page: string;
      startsWith: string | undefined;
      resource: string;
      defaultOption?: never;
      sortOptions?: never;
      sortBy?: never;
    };

/** SSR component that renders a list of items */
export default async function List({
  variant,
  page,
  sortBy,
  startsWith,
  resource,
  defaultOption,
  sortOptions,
}: ListProps) {
  // Conditionally add 'auth' header to request
  const token = await getCookie();
  const requestHeaders: { Authorization?: string } = {};
  if (token) requestHeaders["Authorization"] = `Bearer ${token}`;

  const response = await fetch(resource, { headers: requestHeaders });
  const result: QuerySuccess | ExpectedServerError = await response.json();

  // Conditionally render expected server error
  if ("error" in result) {
    const msg = Array.isArray(result.message)
      ? result.message.join(",")
      : result.message;

    return (
      <>
        <ErrorDisplay msg={`${result.error}: ${msg}`} />
      </>
    );
  }

  const data = result.data as ListWithCount;
  const items = data.items;
  const records = data.countOfRecords;
  const currentPage = +page;
  // The number of pages to render
  const pages = Math.ceil(records / RESULTS_PER_PAGE);

  return (
    <>
      {variant === "birdpedia" && <FilterList startsWith={startsWith} />}
      {variant !== "birdpedia" && (
        <SortItems defaultOption={defaultOption} options={sortOptions} isSSR />
      )}
      <FilterAndResultsText
        variant={variant}
        startsWith={startsWith}
        records={records}
        page={+page!}
      />
      <ul className="my-4">
        {items.map((item) => {
          return <ListItem key={item.id} variant={variant} item={item} />;
        })}
      </ul>
      <PaginateList
        currentPage={currentPage}
        finalPage={pages}
        startsWith={startsWith}
        sortBy={sortBy}
      />
    </>
  );
}
