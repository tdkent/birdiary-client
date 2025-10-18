import {
  DETAILS_RESULTS_PER_PAGE,
  RESULTS_PER_PAGE,
} from "@/constants/constants";
import { ListVariant } from "@/models/display";

type FilterByTextProps = {
  variant: ListVariant;
  startsWith?: string;
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
        <div className="my-6 flex flex-col gap-2 border-y px-2 py-4 text-lg md:py-6 md:text-xl">
          <p className="italic">Showing 0 of 0 results</p>
        </div>
      </>
    );
  }

  const filterText = startsWith
    ? `Filtered by: '${startsWith}'`
    : "No filter applied";

  const detailVariants: (typeof variant)[] = [
    "diaryDetail",
    "birdDetail",
    "locationDetail",
  ];
  const resultsPerPage = detailVariants.includes(variant)
    ? DETAILS_RESULTS_PER_PAGE
    : RESULTS_PER_PAGE;
  const minResult = page * resultsPerPage - (resultsPerPage - 1);
  const maxResult =
    records < page * resultsPerPage ? records : page * resultsPerPage;

  return (
    <>
      <div className="my-6 flex flex-col gap-2 border-y px-2 py-4 text-lg md:py-6 md:text-xl">
        {variant === "birds" && <span>{filterText}</span>}
        <p className="italic">
          Showing{" "}
          <span className="font-semibold">
            {minResult} - {maxResult > 0 ? maxResult : "?"}
          </span>{" "}
          of{" "}
          <span className="font-semibold">{records > 0 ? records : "?"}</span>{" "}
          results
        </p>
      </div>
    </>
  );
}
