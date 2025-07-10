"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SetStateAction } from "react";
import type { SortValues, SortOptions } from "@/models/form";

type SortItemsProps =
  | {
      isSSR?: never;
      setSort: (value: SetStateAction<SortValues>) => void;
      options: SortOptions;
      defaultOption?: never;
    }
  | {
      isSSR: true;
      setSort?: never;
      options: SortOptions;
      defaultOption: SortValues;
    };

/**  Generic <select> element to sort items */
export default function SortItems({
  setSort,
  options,
  defaultOption,
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
    if (isSSR) {
      const url = `${pathname}?page=1&sortBy=${value}`;
      router.push(url);
    } else {
      setSort(value);
    }
  };

  return (
    <>
      <Select onValueChange={handleChange} defaultValue={defaultOption}>
        <SelectTrigger className="mb-4 mt-8 w-1/2">
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
