import { RESULTS_PER_PAGE } from "@/constants/constants";
import { ListPathname } from "@/types/models";

type FilterByTextProps = {
  pathname: ListPathname;
  startsWith: string | undefined;
  records: number;
  page: number;
};

export default function FilterAndResultsText({
  startsWith,
  records,
  page,
  pathname,
}: FilterByTextProps) {
  const filterText = startsWith
    ? `Filtered by: '${startsWith}'`
    : "No filter applied";
  const minResult = page * RESULTS_PER_PAGE - (RESULTS_PER_PAGE - 1);
  const maxResult =
    records < page * RESULTS_PER_PAGE ? records : page * RESULTS_PER_PAGE;

  return (
    <>
      <div className="my-6 flex flex-col gap-2 border-y py-2">
        {pathname === "birds" && <p>{filterText}</p>}
        <p className="italic">
          Showing{" "}
          <span className="font-semibold">
            {minResult} - {maxResult}
          </span>{" "}
          of <span className="font-semibold">{records}</span> bird species
        </p>
      </div>
    </>
  );
}
