"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useApi } from "@/context/ApiContext";
import DiaryDetailsListItem from "@/components/pages/diary/DiaryDetailsListItem";
import ErrorDisplay from "@/components/pages/ErrorDisplay";
import type { DiaryDetails } from "@/types/models";
import { sortAlpha } from "@/helpers/data";
import { apiRoutes } from "@/types/api";

export default function DiaryDetailsList() {
  const { toast } = useToast();
  const { date } = useParams<{ date: string }>();

  const { useQuery } = useApi();
  const { data, error, pending } = useQuery<DiaryDetails>({
    route: apiRoutes.sightingsByDate(date),
    key: "sightings",
    tag: "sightings",
  });

  // Set alphabetical sort options for diary details list
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [sortedDetails, setSortedDetails] = useState<DiaryDetails[]>([]);

  // Sort list
  useEffect(() => {
    if (data) {
      const sorted = sortAlpha([...data], sort);
      setSortedDetails(sorted);
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
        <ErrorDisplay msg={error} />
      </>
    );
  }

  if (!sortedDetails || !sortedDetails.length) {
    return (
      <>
        <p className="my-8">You do not have any diary entries!</p>
        <p>+ Add a new sighting</p>
      </>
    );
  }

  return (
    <>
      <Select
        onValueChange={(value: "asc" | "desc") => {
          setSort(value);
        }}
      >
        <SelectTrigger className="mb-4 mt-8 w-1/2">
          <SelectValue placeholder="Sort sightings" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">A - Z</SelectItem>
          <SelectItem value="desc">Z - A</SelectItem>
        </SelectContent>
      </Select>
      <section>
        {sortedDetails.map((diaryEntry) => {
          return (
            <DiaryDetailsListItem
              key={diaryEntry.sightingId}
              entry={diaryEntry}
            />
          );
        })}
      </section>
    </>
  );
}
