"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type FilterListProps = {
  startsWith: string | undefined;
};

export default function FilterList({ startsWith }: FilterListProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <Select
        value={startsWith ?? ""}
        onValueChange={(value: string) =>
          router.push(`/birds?page=1&startsWith=${value}`)
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder={startsWith ?? "Filter by name"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="A">A</SelectItem>
            <SelectItem value="B">B</SelectItem>
            <SelectItem value="C">C</SelectItem>
            <SelectItem value="D">D</SelectItem>
            <SelectItem value="E">E</SelectItem>
            <SelectItem value="F">F</SelectItem>
            <SelectItem value="G">G</SelectItem>
            <SelectItem value="H">H</SelectItem>
            <SelectItem value="I">I</SelectItem>
            <SelectItem value="J">J</SelectItem>
            <SelectItem value="K">K</SelectItem>
            <SelectItem value="L">L</SelectItem>
            <SelectItem value="M">M</SelectItem>
            <SelectItem value="N">N</SelectItem>
            <SelectItem value="O">O</SelectItem>
            <SelectItem value="P">P</SelectItem>
            <SelectItem value="R">R</SelectItem>
            <SelectItem value="S">S</SelectItem>
            <SelectItem value="T">T</SelectItem>
            <SelectItem value="U">U</SelectItem>
            <SelectItem value="V">V</SelectItem>
            <SelectItem value="W">W</SelectItem>
            <SelectItem value="Y">Y</SelectItem>
            <SelectItem value="Z">Z</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {startsWith && (
        <Button variant="ghost" onClick={() => router.push(`/birds?page=1`)}>
          <X />
          Clear Filter
        </Button>
      )}
    </div>
  );
}
