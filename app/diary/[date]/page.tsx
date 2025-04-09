import SightingsList from "@/components/pages/sightings/SightingsList";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createLocaleString } from "@/helpers/dates";
import { apiRoutes } from "@/types/api";
import type { SortOptions, SortValues } from "@/types/models";

type DiaryParams = {
  params: {
    date: string;
  };
};

export default async function DiaryDetailsView({ params }: DiaryParams) {
  // Need to await params: https://nextjs.org/docs/messages/sync-dynamic-apis
  const { date } = await params;

  // Define options for `SortList` component
  const defaultSort: SortValues = "alphaAsc";
  const sortOptions: SortOptions = [
    { value: "alphaAsc", text: "A - Z" },
    { value: "alphaDesc", text: "Z - A" },
  ];

  return (
    <>
      <h1>Your Diary</h1>
      <Link href="/diary" className="my-4 flex items-center gap-2">
        <ChevronLeft />
        Back to Diary
      </Link>
      <h2>{createLocaleString(date, "huge")}</h2>
      <SightingsList
        route={apiRoutes.sightingsByDate(date)}
        variant="card"
        heading="name"
        defaultSort={defaultSort}
        sortOptions={sortOptions}
      />
    </>
  );
}
