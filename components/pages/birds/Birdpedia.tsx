"use client";

// Displays bird data provided by the API
// User's jwt is optionally added to request from cookie
// Bird data is paginated with `page` query
// Default query: `page=1`, is updated with pagination controls
// Bird data is filtered by name with optional `startsWith` query
// `startsWith` query is updated with select component

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { BASE_URL } from "@/constants/env";
import type { ExpectedServerError, QuerySuccess } from "@/types/api";
import type { Birdpedia, SingleBirdWithCount } from "@/types/models";
import { ErrorMessages } from "@/types/api";
import BirdpediaListItem from "@/components/pages/birds/BirdpediaListItem";
import PaginateList from "@/components/pages/PaginateList";
import FilterBirdList from "@/components/pages/birds/FilterBirdList";

const RESULTS_PER_PAGE = 25;

export default function Birdpedia() {
  const { token } = useContext(AuthContext);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [birdData, setBirdData] = useState<SingleBirdWithCount[]>([]);
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
      <FilterBirdList setChar={setChar} />
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
      <PaginateList
        currentPage={currentPage}
        pages={pages}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
