import { redirect } from "next/navigation";
import CsrList from "@/components/pages/shared/CsrList";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createLocaleString } from "@/helpers/dates";
import { apiRoutes } from "@/models/api";
import { type SortValues, sortByAlphaOptions } from "@/models/form";

type DiaryParams = {
  params: Promise<{ date: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function DiaryDetailsView({
  params,
  searchParams,
}: DiaryParams) {
  const { date } = await params;
  const sortOptions = [...sortByAlphaOptions];

  const { page, sortBy } = await searchParams;

  if (
    !page ||
    !sortBy ||
    !parseInt(page) ||
    parseInt(page) < 1 ||
    !sortOptions.find((option) => option.value === sortBy)
  ) {
    redirect(`/diary/${date}?page=1&sortBy=alphaAsc`);
  }

  const defaultSortOption = sortBy as SortValues;
  const parsedPage = parseInt(page);

  return (
    <>
      <header className="flex flex-col space-y-4">
        <h1>{createLocaleString(date, "med")}</h1>
        <p>
          The details of your birding diary for{" "}
          {createLocaleString(date, "huge")}.
        </p>
        <Link href="/diary" className="flex items-center gap-2">
          <ChevronLeft />
          Back to diary
        </Link>
      </header>
      <CsrList
        route={apiRoutes.sightingsListByType(
          "dateId",
          date,
          parsedPage,
          sortBy,
        )}
        variant="diaryDetail"
        pendingVariant="card"
        tag="sightings"
        page={parsedPage}
        sortBy={sortBy}
        defaultSortOption={defaultSortOption}
        sortOptions={sortOptions}
      />
    </>
  );
}
