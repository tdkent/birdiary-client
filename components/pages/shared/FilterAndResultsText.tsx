import { RESULTS_PER_PAGE } from "@/constants/constants";
import { ListVariant } from "@/models/display";

type FilterByTextProps = {
  variant: ListVariant;
  startsWith: string | undefined;
  records: number;
  page: number;
  noResults: boolean;
};

export default function FilterAndResultsText({
  startsWith,
  records,
  page,
  variant,
  noResults,
}: FilterByTextProps) {
  if (noResults || records === 0) {
    return (
      <>
        <div className="my-6 flex flex-col gap-2 border-y px-2 py-4 text-lg">
          <p className="m-0 italic">Showing 0 of 0 results</p>
        </div>
      </>
    );
  }

  const filterText = startsWith
    ? `Filtered by: '${startsWith}'`
    : "No filter applied";
  const minResult = page * RESULTS_PER_PAGE - (RESULTS_PER_PAGE - 1);
  const maxResult =
    records < page * RESULTS_PER_PAGE ? records : page * RESULTS_PER_PAGE;

  return (
    <>
      <div className="my-6 flex flex-col gap-2 border-y px-2 py-4 text-lg md:py-6 md:text-xl">
        {variant === "birdpedia" && <span>{filterText}</span>}
        <span className="italic">
          Showing{" "}
          <span className="font-semibold">
            {minResult} - {maxResult > 0 ? maxResult : "?"}
          </span>{" "}
          of{" "}
          <span className="font-semibold">{records > 0 ? records : "?"}</span>{" "}
          results
        </span>
      </div>
    </>
  );
}
