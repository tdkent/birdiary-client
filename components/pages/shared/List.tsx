import { getCookie } from "@/helpers/auth";
import type { ExpectedServerError, QuerySuccess } from "@/types/api";
import type { ListWithCount, ListPathname } from "@/types/models";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import FilterList from "@/components/pages/shared/FilterList";
import FilterAndResultsText from "@/components/pages/shared/FilterAndResultsText";
import ListItem from "@/components/pages/shared/ListItem";
import PaginateList from "@/components/pages/shared/PaginateList";
import { RESULTS_PER_PAGE } from "@/constants/constants";

// TODO: search input

type ListProps = {
  pathname: ListPathname;
  page: string | undefined;
  startsWith: string | undefined;
  resource: string;
};

/** SSR components that renders a list of items */
export default async function List({
  pathname,
  page,
  startsWith,
  resource,
}: ListProps) {
  // Conditionally add 'auth' header to request
  const token = await getCookie();
  const requestHeaders: { Authorization?: string } = {};
  if (token) requestHeaders["Authorization"] = `Bearer ${token}`;

  const response = await fetch(resource, { headers: requestHeaders });
  const result: QuerySuccess<ListWithCount> | ExpectedServerError =
    await response.json();

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

  const items = result.data.items;
  const records = result.data.countOfRecords;
  // If no error, `page` param is present
  const currentPage = +page!;
  // Find the number of pages to render
  const pages = Math.ceil(records / RESULTS_PER_PAGE);

  return (
    <>
      {pathname === "birds" && <FilterList startsWith={startsWith} />}
      <FilterAndResultsText
        pathname={pathname}
        startsWith={startsWith}
        records={records}
        page={+page!}
      />
      <ul className="my-4">
        {items.map((item) => {
          return <ListItem key={item.id} pathname={pathname} item={item} />;
        })}
      </ul>
      <PaginateList
        currentPage={currentPage}
        finalPage={pages}
        startsWith={startsWith}
      />
    </>
  );
}
