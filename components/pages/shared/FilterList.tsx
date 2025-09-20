"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

type FilterListProps = {
  noResults: boolean;
  startsWith: string | undefined;
};

export default function FilterList({ noResults, startsWith }: FilterListProps) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-1">
      <Select
        disabled={noResults}
        onValueChange={(value: string) =>
          router.push(`/birds?page=1&startsWith=${value}`)
        }
        value={startsWith ?? ""}
      >
        <SelectTrigger className="w-[70%] py-6 md:w-2/5 md:py-8 md:text-xl">
          <SelectValue placeholder={startsWith ?? "Filter by name"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem className="hover:cursor-pointer" value="A">
              A
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="C">
              C
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="B">
              B
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="D">
              D
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="E">
              E
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="F">
              F
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="G">
              G
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="H">
              H
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="I">
              I
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="J">
              J
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="K">
              K
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="L">
              L
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="M">
              M
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="N">
              N
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="O">
              O
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="P">
              P
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="R">
              R
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="S">
              S
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="T">
              T
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="U">
              U
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="V">
              V
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="W">
              W
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="Y">
              Y
            </SelectItem>
            <SelectItem className="hover:cursor-pointer" value="Z">
              Z
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {startsWith && (
        <Button
          className="text-base font-normal"
          variant="ghost"
          onClick={() => router.push(`/birds?page=1`)}
        >
          <X strokeWidth={1} size={18} />
          Clear Filter
        </Button>
      )}
    </div>
  );
}
