import CsrList from "@/components/pages/shared/CsrList";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createLocaleString } from "@/helpers/dates";
import { apiRoutes } from "@/types/api";
// import type { SortOptions, SortValues } from "@/types/models";

type DiaryParams = {
  params: {
    date: string;
  };
};

export default async function DiaryDetailsView({ params }: DiaryParams) {
  // Need to await params: https://nextjs.org/docs/messages/sync-dynamic-apis
  const { date } = await params;

  // // Define options for `SortList` component
  // const defaultSort: SortValues = "alphaAsc";
  // const sortOptions: SortOptions = [
  //   { value: "alphaAsc", text: "A - Z" },
  //   { value: "alphaDesc", text: "Z - A" },
  // ];

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
        route={apiRoutes.sightingsByDate(date)}
        variant="diaryDetail"
        tag="sightings"
      />
    </>
  );
}
