import { getCookie } from "@/helpers/auth";
import { BASE_URL } from "@/constants/env";
import type { ExpectedServerError, QuerySuccess } from "@/types/api";
import type { BirdsWithCount } from "@/types/models";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import FilterList from "@/components/pages/birdpedia/FilterList";
import FilterAndResultsText from "@/components/pages/birdpedia/FilterAndResultsText";
import BirdpediaListItem from "@/components/pages/birdpedia/BirdpediaListItem";

type BirdpediaListProps = {
  page: string | undefined;
  startsWith: string | undefined;
};

export default async function BirdpediaList({
  page,
  startsWith,
}: BirdpediaListProps) {
  // Conditionally add 'auth' header to request
  const token = await getCookie();
  const requestHeaders: { Authorization?: string } = {};
  if (token) requestHeaders["Authorization"] = `Bearer ${token}`;

  // Create fetch URL
  const resource = `${BASE_URL}/birds?page=${page}${startsWith ? `&startsWith=${startsWith}` : ""}`;

  // Fetch bird data
  const response = await fetch(resource);
  const result: QuerySuccess<BirdsWithCount> | ExpectedServerError =
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

  const birds = result.data.birds;
  const records = result.data.countOfRecords;

  return (
    <>
      <FilterList />
      <FilterAndResultsText
        startsWith={startsWith}
        records={records}
        page={+page!}
      />
      <ul className="my-4">
        {birds.map((bird) => {
          return <BirdpediaListItem key={bird.id} bird={bird} />;
        })}
      </ul>
    </>
  );
}
