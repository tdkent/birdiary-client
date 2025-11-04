"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import birdNames from "@/data/birds";
import { Messages } from "@/models/api";
import { Search, X } from "lucide-react";
import { matchSorter } from "match-sorter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const inputSchema = z.string().min(3).max(100);

export default function SearchForBird() {
  const [error, setError] = useState("");
  const [currInput, setCurrInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const filteredNames = currInput
      ? matchSorter(birdNames, currInput).slice(0, 10)
      : [];
    setFilteredResults(filteredNames);
  }, [currInput]);

  function onSearch() {
    setError("");
    const validate = inputSchema.safeParse(currInput);
    if (!validate.success) {
      setError(Messages.SearchValidationError);
    } else {
      router.push(`/birds?page=1&search=${currInput}`);
    }
    setCurrInput("");
  }

  return (
    <>
      <div className="relative lg:w-1/2">
        <div className="flex items-center justify-between rounded-md border transition focus-within:ring-2 focus-within:ring-ring sm:w-3/5 md:w-1/2 lg:w-full">
          <div className="flex w-full items-center justify-between">
            <Input
              aria-label="Search"
              className="rounded-r-none border-none focus-visible:ring-0"
              onChange={(e) => setCurrInput(e.currentTarget.value)}
              placeholder="Search name or family"
              value={currInput}
            />
            {currInput && (
              <>
                <Button
                  aria-label="Clear"
                  className="my-0 w-fit p-0"
                  onClick={() => setCurrInput("")}
                >
                  <X className="mx-2" strokeWidth={3} size={20} />
                </Button>
              </>
            )}
          </div>
          <Button
            className="my-0 w-fit rounded-l-none rounded-r-md border-l bg-input px-2 py-0 md:h-14"
            onClick={onSearch}
          >
            <Search className="text-foreground" strokeWidth={1.5} />
          </Button>
        </div>

        {error && <p className="my-1 pl-1 text-sm text-destructive">{error}</p>}

        {filteredResults.length ? (
          <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border bg-background py-2 sm:w-3/5 md:max-h-[300px] md:w-1/2 md:text-xl lg:w-full">
            {filteredResults.map((birdName) => {
              return (
                <li
                  key={birdName}
                  onClick={() =>
                    router.push(
                      `/birds/${birdNames.findIndex((name) => name === birdName) + 1}`,
                    )
                  }
                  className="list-hover px-4 py-1"
                >
                  {birdName}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </>
  );
}
