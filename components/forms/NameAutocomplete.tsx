/* Renders a selectable list of birds */
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import type { UseFormReturn } from "react-hook-form";
import birdNames from "@/data/birds";

type NameAutocompleteProps = {
  form: UseFormReturn<{
    commName: string;
  }>;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<boolean>>;
};

export default function NameAutocomplete({
  form,
  selected,
  setSelected,
}: NameAutocompleteProps) {
  // Filtered bird names used in input autocomplete
  const [filteredResults, setFilteredResults] = useState<string[]>([]);
  // Track if the user has made a selection from autocomplete window
  // const [selectionMade, setSelectionMade] = useState(false);

  // Use watch() to track changes to `commName` input
  const currInput = form.watch("commName");

  useEffect(() => {
    // Filter when input is truthy and selection not made
    // Filter array of all accepted common names
    const filteredNames =
      currInput && !selected
        ? birdNames
            .filter((n) => {
              // Make results more predictable:
              // Ignore special characters `-`, `'`, ` `
              // Lower casing of name and input strings
              const regex = /[-' ]/g;
              const name = n.replace(regex, "").toLowerCase();
              const curr = currInput.trim().replace(regex, "").toLowerCase();
              return name.includes(curr);
            })
            // Limit to 6 search results
            .slice(0, 6)
        : [];
    setFilteredResults(filteredNames);
  }, [currInput, selected]);

  return (
    <>
      <ul>
        {filteredResults.map((birdName) => {
          return (
            <li
              key={birdName}
              onClick={() => {
                form.setValue("commName", birdName);
                setSelected(true);
              }}
            >
              {birdName}
            </li>
          );
        })}
      </ul>
    </>
  );
}
