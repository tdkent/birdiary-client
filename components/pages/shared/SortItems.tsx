"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortValues, SortOptions } from "@/models/form";

type SortItemsProps =
  | {
      isSSR?: never;
      options: SortOptions;
      defaultSortOption: SortValues;
      pending: boolean;
      count: number;
    }
  | {
      isSSR: true;
      options: SortOptions;
      defaultSortOption: SortValues;
      pending?: never;
      count?: never;
    };

/**  Generic <select> element to sort items */
export default function SortItems({
  options,
  defaultSortOption,
  pending,
  count,
  isSSR,
}: SortItemsProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (!options) {
    return (
      <>
        <Select disabled>
          <SelectTrigger className="mb-4 mt-8 w-1/2">
            <SelectValue placeholder="Sort list" />
          </SelectTrigger>
        </Select>
      </>
    );
  }

  const handleChange = (value: SortValues) => {
    const url = `${pathname}?page=1&sortBy=${value}`;
    router.push(url);
  };

  return (
    <>
      <Select
        onValueChange={handleChange}
        defaultValue={defaultSortOption}
        disabled={isSSR ? false : pending || !count || count < 1}
      >
        <SelectTrigger
          className={`mb-4 mt-8 w-3/5 ${!isSSR && (pending || !count || count < 1) && "text-foreground/50"}`}
        >
          <SelectValue placeholder="Sort list" />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, text }) => {
            return (
              <SelectItem key={value} value={value}>
                {text}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
