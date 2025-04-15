import { RESULTS_PER_PAGE } from "@/constants/constants";

type FilterByTextProps = {
  char: string;
  records: number;
  currentPage: number;
};

export default function FilterByText({
  char,
  records,
  currentPage,
}: FilterByTextProps) {
  const filterText = char ? `Filtered by: '${char}'` : "No filter applied";
  const minResult = currentPage * RESULTS_PER_PAGE - (RESULTS_PER_PAGE - 1);
  const maxResult =
    records < currentPage * RESULTS_PER_PAGE
      ? records
      : currentPage * RESULTS_PER_PAGE;

  return (
    <>
      <div className="my-6 flex flex-col gap-2 border-y py-2">
        <p>{filterText}</p>
        <p className="italic">
          Showing{" "}
          <span className="font-semibold">
            {minResult} - {maxResult}
          </span>{" "}
          of <span className="font-semibold">{records}</span> birds
        </p>
      </div>
    </>
  );
}
