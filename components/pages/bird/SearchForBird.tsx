"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import birdNames from "@/data/birds";
import { ChevronRight, Search } from "lucide-react";
import { matchSorter } from "match-sorter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchForBird() {
  const [currInput, setCurrInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const filteredNames = currInput
      ? matchSorter(birdNames, currInput).slice(0, 10)
      : [];
    setFilteredResults(filteredNames);
  }, [currInput]);

  return (
    <>
      <div>
        <div className="flex items-center">
          <Search />
          <Input onChange={(e) => setCurrInput(e.currentTarget.value)} />
          <Button size="icon">
            <ChevronRight />
          </Button>
        </div>

        {filteredResults.length ? (
          <ul className="absolute max-h-48 w-full overflow-auto rounded-md border bg-background py-2 md:max-h-[300px] md:text-xl">
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
