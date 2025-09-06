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
      noResults: boolean;
    }
  | {
      isSSR: true;
      options: SortOptions;
      defaultSortOption: SortValues;
      pending?: never;
      count?: never;
      noResults: boolean;
    };

/**  Generic <select> element to sort items */
export default function SortItems({
  options,
  defaultSortOption,
  pending,
  count,
  isSSR,
  noResults,
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
        disabled={noResults || (isSSR ? false : pending || !count || count < 1)}
      >
        <SelectTrigger
          className={`w-[70%] py-6 md:w-2/5 md:py-8 ${noResults && "text-foreground/50"} ${!isSSR && (pending || !count || count < 1) && "text-foreground/50"} md:text-xl`}
        >
          <SelectValue placeholder="Sort list" />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, text }) => {
            return (
              <SelectItem
                className="hover:cursor-pointer md:py-2 md:text-xl"
                key={value}
                value={value}
              >
                {text}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
