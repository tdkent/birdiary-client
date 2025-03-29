"use client";

import { Loader2 } from "lucide-react";
import { useApi } from "@/context/ApiContext";
import DiaryListItem from "@/components/pages/diary/DiaryListItem";
import type { Diary } from "@/types/models";

export default function DiaryList() {
  const { useQuery } = useApi();
  const { data, error, pending } = useQuery<Diary>({
    route: "/sightings?groupby=date",
    key: "diary",
    tag: "diary",
  });

  if (pending) {
    return (
      <>
        <Loader2 />
      </>
    );
  }

  // TODO: error toast
  if (error) {
    return (
      <>
        <p>There was an error</p>
      </>
    );
  }

  if (!data || !data.length) {
    return (
      <>
        <p>No items to show</p>
      </>
    );
  }

  return (
    <>
      <ul className="sighting-list">
        {data.map((entry) => {
          return <DiaryListItem key={entry.date} diaryEntry={entry} />;
        })}
      </ul>
    </>
  );
}
