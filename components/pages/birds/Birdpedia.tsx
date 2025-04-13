"use client";

// Displays bird data provided by the API
// User's jwt is optionally added to request from cookie
// Bird data is paginated with `page` query
// Default query: `page=1`, is updated with pagination controls
// Bird data is filtered by name with optional `startsWith` query
// `startsWith` query is updated with select component

import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants/env";
import type { ExpectedServerError, QuerySuccess } from "@/types/api";
import type { SingleBird } from "@/types/models";
import { ErrorMessages } from "@/types/api";

type BirdpediaQuery = {
  birds: SingleBird[];
  countOfRecords: number;
};

const RESULTS_PER_PAGE = 25;

export default function Birdpedia() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [birdData, setBirdData] = useState<SingleBird[]>([]);
  console.log(birdData);
  const [pages, setPages] = useState(0);
  console.log(pages);
  const [currentPage, setCurrentPage] = useState(10);

  useEffect(() => {
    const getBirds = async () => {
      setPending(true);
      setError(null);
      try {
        const response = await fetch(BASE_URL + "/birds?page=" + currentPage);
        const result: QuerySuccess<BirdpediaQuery> | ExpectedServerError =
          await response.json();

        console.log(result);

        if ("error" in result) {
          const msg = Array.isArray(result.message)
            ? result.message.join(",")
            : result.message;
          throw new Error(`${result.error}: ${msg}`);
        }
        // Set pagination count
        const paginationCount = Math.ceil(
          result.data.countOfRecords / RESULTS_PER_PAGE,
        );
        setPages(paginationCount);
        setBirdData(result.data.birds);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(ErrorMessages.Default);
        }
      } finally {
        setPending(false);
      }
    };
    getBirds();
  }, [currentPage]);

  return (
    <>
      <ul></ul>
    </>
  );
}
