import { getCookie } from "@/helpers/auth";
import type {
  ServerResponseWithList,
  ServerResponseWithError,
} from "@/models/api";
import type { SortOptions, SortValues } from "@/models/form";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import SortItems from "@/components/pages/shared/SortItems";
import FilterList from "@/components/pages/shared/FilterList";
import FilterAndResultsText from "@/components/pages/shared/FilterAndResultsText";
import ListItem from "@/components/pages/shared/ListItem";
import PaginateList from "@/components/pages/shared/PaginateList";
import { RESULTS_PER_PAGE } from "@/constants/constants";

type ListProps =
  | {
      variant: "lifelistSighting" | "location" | "locationDetail";
      page: number;
      sortBy: string;
      resource: string;
      defaultSortOption: SortValues;
      sortOptions: SortOptions;
      startsWith?: never;
    }
  | {
      variant: "birdpedia";
      page: number;
      startsWith: string | undefined;
      resource: string;
      defaultSortOption?: never;
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
  defaultSortOption,
  sortOptions,
}: ListProps) {
  const token = await getCookie();
  const requestHeaders: { Authorization?: string } = {};
  if (token) requestHeaders["Authorization"] = `Bearer ${token}`;

  const response = await fetch(resource, { headers: requestHeaders });
  const result: ServerResponseWithList | ServerResponseWithError =
    await response.json();

  if ("error" in result) {
    const error = result as ServerResponseWithError;
    const msg = Array.isArray(error.message)
      ? error.message.join(",")
      : error.message;

    return (
      <>
        <ErrorDisplay msg={`${error.error}: ${msg}`} />
      </>
    );
  }

  const records = result.countOfRecords;
  const pages = Math.ceil(records / RESULTS_PER_PAGE);

  return (
    <>
      {variant === "birdpedia" ? (
        <FilterList startsWith={startsWith} />
      ) : (
        <SortItems
          defaultSortOption={defaultSortOption}
          options={sortOptions}
          isSSR
        />
      )}
      <FilterAndResultsText
        variant={variant}
        startsWith={startsWith}
        records={result.countOfRecords}
        page={+page!}
      />
      <ul className="my-4">
        {result.data.map((item) => {
          return <ListItem key={item.id} variant={variant} item={item} />;
        })}
      </ul>
      <PaginateList
        currentPage={page}
        finalPage={pages}
        startsWith={startsWith}
        sortBy={sortBy}
      />
    </>
  );
}
