import DiaryDetailsList from "@/components/pages/diary/DiaryDetailsList";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createLocaleString } from "@/helpers/dates";

type DiaryParams = {
  params: {
    date: string;
  };
};

export default async function DiaryDetailsView({ params }: DiaryParams) {
  // Need to await params: https://nextjs.org/docs/messages/sync-dynamic-apis
  const { date } = await params;
  return (
    <>
      <h1>Your Diary</h1>
      <Link href="/diary" className="my-4 flex items-center gap-2">
        <ChevronLeft />
        Back to Diary
      </Link>
      <h2>{createLocaleString(date, "huge")}</h2>
      <DiaryDetailsList />
    </>
  );
}
