// Generic <select> element to sort items

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SetStateAction } from "react";
import type { SortValues, SortOptions } from "@/types/models";

type SortItemsProps = {
  // `setSort` function called on a generic array
  setSort: (value: SetStateAction<SortValues>) => void;
  // array of options objects to create <SelectItem>s
  options: SortOptions;
};

export default function SortItems({ setSort, options }: SortItemsProps) {
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

  return (
    <>
      <Select
        onValueChange={(value: SortValues) => {
          setSort(value);
        }}
      >
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
