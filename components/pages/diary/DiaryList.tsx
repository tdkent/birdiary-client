"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useApi } from "@/context/ApiContext";
import DiaryListItem from "@/components/pages/diary/DiaryListItem";
import type { Diary } from "@/types/models";
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

  if (!data || !data.length) {
    return (
      <>
        <p className="my-8">You do not have any diary entries!</p>
        <p>+ Add a new sighting</p>
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
