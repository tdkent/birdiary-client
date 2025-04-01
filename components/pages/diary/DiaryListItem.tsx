import Link from "next/link";
import type { Diary } from "@/types/models";
import { createLocaleString } from "@/helpers/dates";

type DiaryListItemProps = {
  diaryEntry: Diary;
};

export default function DiaryListItem({ diaryEntry }: DiaryListItemProps) {
  const { date, count } = diaryEntry;
  const dateLocaleString = createLocaleString(date, "med");
  return (
    <>
      <Link href={`/diary/${date.slice(0, 10)}`}>
        <li>
          <span>{dateLocaleString}</span>
          <span className="text-sm">
            {count} sighting{count > 1 && "s"}
          </span>
        </li>
      </Link>
    </>
  );
}
