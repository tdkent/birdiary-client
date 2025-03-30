"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useApi } from "@/context/ApiContext";
import DiaryListItem from "@/components/pages/diary/DiaryListItem";
import type { Diary, DiarySortOptions } from "@/types/models";
import { sortDiary } from "@/helpers/data";

export default function DiaryList() {
  const { useQuery } = useApi();
  const { data, error, pending } = useQuery<Diary>({
    route: "/sightings?groupby=date",
    key: "diary",
    tag: "diary",
  });

  // Sort diary
  const [sort, setSort] = useState<DiarySortOptions>("dateDesc");
  const [sortedDiary, setSortedDiary] = useState<Diary[]>([]);

  useEffect(() => {
    if (data) {
      const sorted = sortDiary([...data], sort);
      setSortedDiary(sorted);
    }
  }, [data, sort]);

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

  if (!sortedDiary || !sortedDiary.length) {
    return (
      <>
        <p>No items to show</p>
      </>
    );
  }

  return (
    <>
      <Select onValueChange={(value: DiarySortOptions) => setSort(value)}>
        <SelectTrigger className="w-1/2 mt-8 mb-4">
          <SelectValue placeholder="Date (Newest)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="dateDesc">Date (Newest)</SelectItem>
          <SelectItem value="dateAsc">Date (Oldest)</SelectItem>
          <SelectItem value="sightings">Sightings</SelectItem>
        </SelectContent>
      </Select>
      <ul className="sighting-list">
        {sortedDiary.map((entry) => {
          return <DiaryListItem key={entry.date} diaryEntry={entry} />;
        })}
      </ul>
    </>
  );
}
