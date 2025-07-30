import { RESULTS_PER_PAGE } from "@/constants/constants";
import { ListVariant } from "@/models/display";

type FilterByTextProps = {
  variant: ListVariant;
  startsWith: string | undefined;
  records: number;
  page: number;
};

export default function FilterAndResultsText({
  startsWith,
  records,
  page,
  variant,
}: FilterByTextProps) {
  if (records === 0) {
    return (
      <>
        <div className="my-6 flex flex-col gap-2 border-y py-4">
          <p className="m-0 text-sm italic">Showing 0 of 0 results</p>
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
      <div className="my-6 flex flex-col gap-2 border-y py-4">
        {variant === "birdpedia" && <p>{filterText}</p>}
        <p className="m-0 text-sm italic">
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
