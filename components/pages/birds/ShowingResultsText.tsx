import { RESULTS_PER_PAGE } from "@/constants/constants";

type ShowingResultsTextProps = {
  currentPage: number;
  records: number;
};

export default function ShowingResultsText({
  currentPage,
  records,
}: ShowingResultsTextProps) {
  const minResult = currentPage * RESULTS_PER_PAGE - (RESULTS_PER_PAGE - 1);
  const maxResult =
    records < currentPage * RESULTS_PER_PAGE
      ? records
      : currentPage * RESULTS_PER_PAGE;

  return (
    <>
      <p>
        Showing {minResult} - {maxResult} of {records} results
      </p>
    </>
  );
}
