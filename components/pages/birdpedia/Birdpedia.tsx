"use client";

// Displays bird data provided by the API
// User's jwt is optionally added to request from cookie
// Bird data is paginated with `page` query
// Default query: `page=1`, is updated with pagination controls
// Bird data is filtered by name with optional `startsWith` query
// `startsWith` query is updated with select component

// TODO: Showing...Results component
// TODO: Null results text
// TODO: Error handling
// TODO: Loading spinner
// TODO: Reset current page when filtering list
// TODO: Show additional pagination options (if more pages)
// TODO: Cross link list items to bird details pages
// TODO: Remove filter options that have no results ("X", etc.)
// TODO: "Filter by" text component

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { BASE_URL } from "@/constants/env";
import type { ExpectedServerError, QuerySuccess } from "@/types/api";
import type { Birdpedia, SingleBirdWithCount } from "@/types/models";
import { ErrorMessages } from "@/types/api";
import BirdpediaListItem from "@/components/pages/birdpedia/BirdpediaListItem";
import PaginateList from "@/components/pages/shared/PaginateList";
import FilterBirdList from "@/components/pages/birdpedia/FilterBirdList";
import ShowingResultsText from "@/components/pages/birdpedia/ShowingResultsText";
import { RESULTS_PER_PAGE } from "@/constants/constants";

export default function Birdpedia() {
  const { token } = useContext(AuthContext);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [birdData, setBirdData] = useState<SingleBirdWithCount[]>([]);
  const [records, setRecords] = useState(0);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [char, setChar] = useState("");

  useEffect(() => {
    const getBirds = async () => {
      setPending(true);
      setError(null);

      const resource = `${BASE_URL}/birds?page=${currentPage}${char ? `&startsWith=${char}` : ""}`;

      try {
        const requestHeaders: { Authorization?: string } = {};
        if (token) requestHeaders["Authorization"] = `Bearer ${token}`;
        const response = await fetch(resource, {
          headers: requestHeaders,
        });
        const result: QuerySuccess<Birdpedia> | ExpectedServerError =
          await response.json();

        if ("error" in result) {
          const msg = Array.isArray(result.message)
            ? result.message.join(",")
            : result.message;
          throw new Error(`${result.error}: ${msg}`);
        }
        setRecords(result.data.countOfRecords);
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
  }, [currentPage, char, token]);

  if (pending) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <FilterBirdList setChar={setChar} setCurrentPage={setCurrentPage} />
      {char && (
        <div>
          <p>
            Filtering birds by letter: <q>{char}</q>
          </p>
        </div>
      )}
      <ul className="my-4">
        {birdData.map((bird) => {
          return <BirdpediaListItem key={bird.id} bird={bird} />;
        })}
      </ul>
      <ShowingResultsText currentPage={currentPage} records={records} />
      <PaginateList
        currentPage={currentPage}
        pages={pages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
