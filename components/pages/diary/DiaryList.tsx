"use client";

import { Loader2 } from "lucide-react";
import { useApi } from "@/context/ApiContext";
import type { Diary } from "@/types/models";

export default function DiaryList() {
  const { useQuery } = useApi();
  const { data, error, pending } = useQuery<Diary>({
    route: "/sightings?groupby=date",
    key: "diary",
    tag: "diary",
  });
  console.log(data, error, pending);

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
      <ul>
        {data.map((entry) => {
          return <li key={entry.date}>{entry._count._all}</li>;
        })}
      </ul>
    </>
  );
}
