"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useApi } from "@/context/ApiContext";
import DiaryListItem from "@/components/pages/diary/DiaryListItem";
import type { Diary, DiarySortOptions } from "@/types/models";
import { sortDiary } from "@/helpers/data";
import ErrorDisplay from "@/components/pages/ErrorDisplay";
import { apiRoutes } from "@/types/api";

export default function DiaryList() {
  const { toast } = useToast();
  const { useQuery } = useApi();
  const { data, error, pending } = useQuery<Diary>({
    route: apiRoutes.groupedSightings("date"),
    key: "diary",
    tag: "diary",
  });

  // Sort diary
  const [sort, setSort] = useState<DiarySortOptions>("dateDesc");
  const [sortedDiary, setSortedDiary] = useState<Diary[]>([]);

  // Sort list
  useEffect(() => {
    if (data) {
      const sorted = sortDiary([...data], sort);
      setSortedDiary(sorted);
    }
  }, [data, sort]);

  // Error toast
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: error,
      });
    }
  }, [error, toast]);

  if (pending) {
    return (
      <>
        <Loader2 />
      </>
    );
  }

  if (error) {
    return (
      <>
        <ErrorDisplay msg={error} showReloadBtn />
      </>
    );
  }

  if (!sortedDiary || !sortedDiary.length) {
    return (
      <>
        <p className="my-8">You do not have any diary entries!</p>
        <p>+ Add a new sighting</p>
      </>
    );
  }

  return (
    <>
      <Select onValueChange={(value: DiarySortOptions) => setSort(value)}>
        <SelectTrigger className="mb-4 mt-8 w-1/2">
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
