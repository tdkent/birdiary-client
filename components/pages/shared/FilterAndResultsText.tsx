import {
  DETAILS_RESULTS_PER_PAGE,
  RESULTS_PER_PAGE,
} from "@/constants/constants";
import { ListVariant } from "@/models/display";

type FilterByTextProps = {
  noResults: boolean;
  page: number;
  records: number;
  search?: string;
  startsWith?: string;
  variant: ListVariant;
};

export default function FilterAndResultsText({
  noResults,
  page,
  records,
  search,
  startsWith,
  variant,
}: FilterByTextProps) {
  let filterStr = "None";
  if (startsWith) filterStr = `Name begins with '${startsWith}'`;
  if (search) filterStr = `Name or family contains '${search}'`;

  if (noResults || records === 0) {
    return (
      <>
        <div className="my-6 flex flex-col gap-2 border-y px-2 py-4 md:py-6">
          <p className="text-base sm:text-lg md:text-xl">Filter: {filterStr}</p>
          <p className="text-base italic sm:text-lg md:text-xl">
            Showing 0 of 0 results
          </p>
        </div>
      </>
    );
  }

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
      <div className="my-6 flex flex-col gap-2 border-y px-2 py-4 md:py-6">
        {variant === "birds" && (
          <p className="text-base sm:text-lg md:text-xl">Filter: {filterStr}</p>
        )}
        <p className="text-base italic sm:text-lg md:text-xl">
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
