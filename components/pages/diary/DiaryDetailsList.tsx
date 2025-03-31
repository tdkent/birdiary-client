"use client";

import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApi } from "@/context/ApiContext";

export default function DiaryDetailsList() {
  const { date } = useParams<{ date: string }>();

  const { useQuery } = useApi();
  const { data, error, pending } = useQuery({
    route: `/sightings/date/${date}`,
    key: "sightings",
    tag: "sightings",
  });

  return (
    <>
      <Select onValueChange={() => {}}>
        <SelectTrigger className="mb-4 mt-8 w-1/2">
          <SelectValue placeholder="Sort sightings" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">A - Z</SelectItem>
          <SelectItem value="desc">Z - A</SelectItem>
          <SelectItem value="new">New</SelectItem>
        </SelectContent>
      </Select>
      <p>list here</p>
    </>
  );
}
