/* Renders a selectable list of birds */
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import birdNames from "@/data/birds";
import type { SightingFormProp } from "@/models/form";

type NameAutocompleteProps = {
  form: SightingFormProp;
  isMatching: boolean;
  setIsMatching: Dispatch<SetStateAction<boolean>>;
};

export default function NameAutocomplete({
  form,
  isMatching,
  setIsMatching,
}: NameAutocompleteProps) {
  // Filtered bird names used in input autocomplete
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  // Use watch() to track changes to `commName` input
  const currInput = form.watch("commonName");

  // Track if input matches an allowed common name
  useEffect(() => {
    setIsMatching(birdNames.includes(currInput));
  }, [currInput, setIsMatching]);

  // Control render of autocomplete list
  useEffect(() => {
    // Filter when input is truthy and selection not made
    // Filter array of all accepted common names
    const filteredNames =
      currInput && !isMatching
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
  }, [currInput, isMatching]);

  return (
    <>
      <ul>
        {filteredResults.map((birdName) => {
          return (
            <li
              key={birdName}
              onClick={() => form.setValue("commonName", birdName)}
            >
              {birdName}
            </li>
          );
        })}
      </ul>
    </>
  );
}
