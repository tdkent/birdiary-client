import birdNames from "@/db/birdNames";
import type { FormReturnSightingForm } from "@/schemas/sighting.schema";
import { matchSorter } from "match-sorter";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type NameAutocompleteProps = {
  form: FormReturnSightingForm;
  isMatching: boolean;
  setIsMatching: Dispatch<SetStateAction<boolean>>;
};

/** Filter and display bird names based on user input. */
export default function NameAutocomplete({
  form,
  isMatching,
  setIsMatching,
}: NameAutocompleteProps) {
  const [filteredResults, setFilteredResults] = useState<string[]>([]);
  const currInput = form.watch("commonName");

  // Check if input matches an allowed common name
  useEffect(() => {
    setIsMatching(birdNames.includes(currInput));
  }, [currInput, setIsMatching]);

  // Render list
  useEffect(() => {
    const filteredNames =
      currInput && !isMatching
        ? matchSorter(birdNames, currInput).slice(0, 10)
        : [];
    setFilteredResults(filteredNames);
  }, [currInput, isMatching]);

  if (!filteredResults.length) return null;

  return (
    <>
      <ul className="absolute max-h-48 w-full overflow-auto rounded-md border bg-background py-2 md:max-h-[300px] md:text-xl">
        {filteredResults.map((birdName) => {
          return (
            <li
              key={birdName}
              onClick={() => form.setValue("commonName", birdName)}
              className="list-hover px-4 py-1"
            >
              {birdName}
            </li>
          );
        })}
      </ul>
    </>
  );
}
